import urllib.request, json
import sys
sys.path.append(str(sys.path[0]) + '/XlsxWriter')
import xlsxwriter

survey_id = sys.argv[1]
col_id = sys.argv[2]
dept_id = sys.argv[3]



def response(url):
    with urllib.request.urlopen(url) as response:
        return response.read()

done = []

def check_if_not_done(i):
    global done
    for j in done:
        if(j[0] == i[0] and j[1] == i[1]):
            return False
    return True

############################ FIRST PAGE REPORT ####################

workbook = xlsxwriter.Workbook("public/downloads/" + str(survey_id)+"_" + dept_id + ".xlsx")

header_format = workbook.add_format()
header_format.set_align('center')
header_format.set_bold()
header_format.set_font_color('white')
header_format.set_bg_color('blue')
header_format.set_border(0)
header_format.set_num_format('0.00')
header_format.set_align('vcenter')

rating_format = workbook.add_format()
rating_format.set_align('center')
rating_format.set_bg_color('#F0EDCC')
rating_format.set_num_format('0.00')

final_rating_format = workbook.add_format()
final_rating_format.set_align('center')
final_rating_format.set_bg_color('#BFFCC3')
final_rating_format.set_num_format('0.00')

name_format = workbook.add_format()
name_format.set_align('center')
name_format.set_bold()
name_format.set_text_wrap()

format1 = workbook.add_format()
format1.set_bg_color('red')
format1.set_font_color('white')

title_format = workbook.add_format()
title_format.set_bold()
title_format.set_text_wrap()
title_format.set_align('center')
title_format.set_align('vcenter')

class_format = workbook.add_format()
class_format.set_bold()
class_format.set_text_wrap()
class_format.set_align('center')
class_format.set_align('vcenter')
class_format.set_bg_color('#008080')
class_format.set_font_color('white')

bold = workbook.add_format({'bold': True})
sems = [4, 6, 8]

for sem in sems:

    print(sem)
    if(sem == 4):
        clas = "SE"
    elif(sem == 6):
        clas = "TE"
    elif(sem == 8):
        clas = "BE"

    url = "http://localhost:3000/ajax/get_sub_reports?survey_id="+str(survey_id)+"&col_id="+str(col_id)+"&dept_id="+str(dept_id)+"&sem="+str(sem)
    print(url)

    data = response(url)
    jsondata = json.loads(data)

    head_row = 5
    cur_col = 0
    cur_row = 5
    start_col = 0

    worksheet = workbook.add_worksheet(clas)
    worksheet.protect("forthenightisdarkandfullofterrors")
    cur_sheet_name = clas
    worksheet.set_column(0, 1, 9)
    worksheet.set_column(1, 1, 15)
    worksheet.set_column(2, 13, 6)

    worksheet.set_landscape()
    worksheet.set_margins(left = 0.5, right = 0.5, top = 0.5, bottom = 0.5)

    for i in jsondata:
        for j in i:
            if(j == 'col_id'):
                worksheet.write('A1', clas, class_format)
                worksheet.merge_range('B2:N2', 'BHARATI VIDYAPEETH COLLEGE OF ENGINEERING', title_format)
                worksheet.merge_range('C4:F4', 'DEPARTMENT : CHEMICAL', title_format)

                chart = workbook.add_chart({'type': 'column'})
                chart.set_legend({'position': 'right'})

                chart2 = workbook.add_chart({'type': 'pie'})
                chart2.set_legend({'position': 'right'})

                worksheet.conditional_format('A5:Z80', {'type': 'cell', 'criteria': 'between', 'minimum': 1, 'maximum' : 3, 'format':   format1})

            elif(j == 'survey_id'):
                worksheet.merge_range('H4:K4', 'SURVEY : ' + i[j], title_format)
            elif(j == 'sub_name'):
                cur_col = 0
                cur_row += 1
                s = i[j].split('(')
                x = s[len(s) - 1]
                s = x.split(')')
                x = s[0]
                worksheet.write(head_row, cur_col, 'SUBJECTS', header_format)
                worksheet.write(cur_row, cur_col, x, name_format)
                worksheet.set_row(cur_row, 30)
                cur_col += 1
            elif(j == 'prof_name'):
                worksheet.write(head_row, cur_col, 'PROFESSORS', header_format)
                worksheet.write(cur_row, cur_col, i[j], name_format)
                cur_col += 1
                start_col = cur_col

            elif(j == 'report'):
                for k in i[j]:
                    for l in k:
                        if(l == 'q_id'):
                            worksheet.write(head_row, cur_col, k[l], header_format)
                        elif(l == 'avgR'):
                            worksheet.write(cur_row, cur_col , k[l], rating_format)
                            cur_col += 1


                worksheet.write(head_row, cur_col, 'AVG', header_format)
                worksheet.write_formula(cur_row, cur_col, "=AVERAGE(" + chr(ord("A") + start_col) + str(cur_row + 1) + ":" + chr(ord("A") + cur_col - 1) + str(cur_row + 1) + ")", final_rating_format)


    chart.add_series({'categories' : '=\''+ cur_sheet_name +'\'!$' + chr(ord("A") + start_col - 1) + '$' + str(head_row + 2) + ':$' + chr(ord("A") + start_col - 1) + '$' + str(cur_row + 1) , 'values' : '=\''+ cur_sheet_name +'\'!$' + chr(ord("A") + cur_col) + '$' + str(head_row + 2) + ':$' + chr(ord("A") + cur_col) + '$' + str(cur_row + 1)} )
    chart2.add_series({'categories' : '=\''+ cur_sheet_name +'\'!$' + chr(ord("A") + start_col - 1) + '$' + str(head_row + 2) + ':$' + chr(ord("A") + start_col - 1) + '$' + str(cur_row + 1) , 'values' : '=\''+ cur_sheet_name +'\'!$' + chr(ord("A") + cur_col) + '$' + str(head_row + 2) + ':$' + chr(ord("A") + cur_col) + '$' + str(cur_row + 1)} )
    print({'categories' : '=\''+ cur_sheet_name +'\'!$' + chr(ord("A") + start_col - 1) + '$' + str(head_row + 2) + ':$' + chr(ord("A") + start_col - 1) + '$' + str(cur_row + 1) , 'values' : '=\''+ cur_sheet_name +'\'!$' + chr(ord("A") + cur_col) + '$' + str(head_row + 2) + ':$' + chr(ord("A") + cur_col) + '$' + str(cur_row + 1)})
    chart.set_size({'x_scale': 0.7, 'y_scale': 0.9})
    chart2.set_size({'x_scale': 0.7, 'y_scale': 0.9})
    worksheet.insert_chart(cur_row + 3, 1, chart)
    worksheet.insert_chart(cur_row + 3, 7, chart2)
workbook.close()


############################ END OF FIRST PAGE REPORT ####################

for sem in sems:
    print(sem)
    if(sem == 4):
        clas = "SE"
    elif(sem == 6):
        clas = "TE"
    elif(sem == 8):
        clas = "BE"

    workbook = xlsxwriter.Workbook("public/downloads/" + str(survey_id)+"_" + dept_id + "_"+str(clas)+".xlsx")

    url = "http://localhost:3000/ajax/get_sub_excel_reports?survey_id="+str(survey_id)+"&col_id="+str(col_id)+"&dept_id="+str(dept_id)+"&sem="+str(sem)
    print(url)
    def response(url):
        with urllib.request.urlopen(url) as response:
            return response.read()

    data = response(url)
    jsondata = json.loads(data)

    header_format = workbook.add_format()
    header_format.set_bold()
    header_format.set_font_color('white')
    header_format.set_bg_color('blue')
    header_format.set_align('center')
    header_format.set_align('vcenter')

    rating_format = workbook.add_format()
    rating_format.set_align('center')
    rating_format.set_align('vcenter')
    rating_format.set_font_size(9)

    title_format = workbook.add_format()
    title_format.set_bold()
    title_format.set_text_wrap()
    title_format.set_align('center')
    bold = workbook.add_format({'bold': True})

    final_rating_format = workbook.add_format()
    final_rating_format.set_align('center')
    final_rating_format.set_bg_color('#BFFCC3')
    final_rating_format.set_num_format('0.00')

    class_format = workbook.add_format()
    class_format.set_bold()
    class_format.set_text_wrap()
    class_format.set_align('center')
    class_format.set_align('vcenter')
    class_format.set_bg_color('#008080')
    class_format.set_font_color('white')

    header_row = 1
    cur_col = -1
    cur_row = 0

    for i in jsondata:
        # x = Data()
        for j in i:
            if(j == 'sub_name'):

                s = i[j].split('(')
                x = s[len(s) - 1]
                s = x.split(')')
                x = s[0]
                worksheet = workbook.add_worksheet(x)
                worksheet.protect("forthenightisdarkandfullofterrors")

                worksheet.write('A1', clas, class_format)
                worksheet.set_column(0, 20, 7)
                cur_sub_name = str(i[j])
                cur_col = -1
                cur_row = header_row + 1
                worksheet.write('C4', str(i[j]))
            elif(j == 'prof_name'):
                worksheet.merge_range('B1:J1', "Subject Name : " + cur_sub_name, title_format)
                worksheet.merge_range('B2:J2', "Professor Name : " + str(i[j]), title_format)

            elif(j == "report"):
                for k in i[j]:
                    for l in k:
                        if(l == 'q_id'):
                            cur_col += 1
                            cur_row = header_row + 1
                            worksheet.write(cur_row, cur_col, k[l], header_format)
                        elif(l == 'reports'):
                            for m in k[l]:
                                cur_row += 1
                                worksheet.set_row(cur_row, 9.5)
                                worksheet.write(cur_row, cur_col + 1, m, rating_format)
                            worksheet.write_formula(cur_row + 1, cur_col + 1, "=AVERAGE(" + chr(ord("A") + cur_col + 1) + str(header_row + 3) + ":" + chr(ord("A") + cur_col + 1) + str(cur_row + 1) + ")", final_rating_format)

    workbook.worksheets_objs.sort(key=lambda x: x.name)
    workbook.close()

print("Omkar")

sys.stdout.flush()