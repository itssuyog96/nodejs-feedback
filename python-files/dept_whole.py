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

workbook = xlsxwriter.Workbook('public/downloads/'+str(survey_id)+"_"+str(dept_id)+".xlsx")

header_format = workbook.add_format()
header_format.set_align('center')
header_format.set_bold()
header_format.set_font_color('white')
header_format.set_bg_color('blue')
header_format.set_border(0)

rating_format = workbook.add_format()
rating_format.set_align('center')
rating_format.set_bg_color('#F0EDCC')

final_rating_format = workbook.add_format()
final_rating_format.set_align('center')
final_rating_format.set_bg_color('#BFFCC3')

format1 = workbook.add_format()
format1.set_bg_color('red')
format1.set_font_color('white')

bold = workbook.add_format({'bold': True})


sems = [4, 6, 8]

for sem in sems:

    url = "http://localhost:3000/ajax/get_sub_reports?survey_id="+str(survey_id)+"&col_id="+str(col_id)+"&dept_id="+str(dept_id)+"&sem="+str(sem)
    print(url)

    data = response(url)
    jsondata = json.loads(data)

    head_row = 5
    cur_col = 0
    cur_row = 5
    start_col = 0

    worksheet = workbook.add_worksheet('Sem - ' + str(sem) )
    worksheet.protect("forthenightisdarkandfullofterrors")
    cur_sheet_name = 'Sem - ' + str(sem)
    worksheet.set_column(0, 1, 40)
    worksheet.set_column(1, 1, 25)
    worksheet.set_column(2, 13, 13)

    for i in jsondata:
        for j in i:
            if(j == 'col_id'):
                worksheet.write(2, 2, 'COLLEGE NAME', bold)
                worksheet.write(2, 3, 'BHARATI VIDYAPEETH COLLEGE OF ENGINEERING')
                worksheet.write(3, 2, 'DEPARTMENT', bold)
                worksheet.write(3, 3, 'CHEMICAL')
                worksheet.write(3, 6, 'SEMESTER', bold)
                worksheet.write(3, 7, 'SEM-' + str(i[j]))
                chart = workbook.add_chart({'type': 'column'})
                chart.set_legend({'position': 'right'})

                chart2 = workbook.add_chart({'type': 'pie'})
                chart2.set_legend({'position': 'right'})

                worksheet.conditional_format('A1:Z80', {'type': 'cell', 'criteria': 'between', 'minimum': 1, 'maximum' : 3, 'format':   format1})

                # chart.set_x_axis({'name':'PROFESSORS', 'name_font': 'bold'})
                # chart.set_y_axis({'name':'AVERAGE RATING', 'name_font': 'bold'})
            elif(j == 'survey_id'):
                worksheet.write(2, 6, 'SURVEY NAME', bold)
                worksheet.write(2, 7, i[j])
            elif(j == 'sub_name'):
                cur_col = 0
                cur_row += 1
                worksheet.write(head_row, cur_col, 'SUBJECTS', header_format)
                worksheet.write(cur_row, cur_col, i[j])
                cur_col += 1
            elif(j == 'prof_name'):
                worksheet.write(head_row, cur_col, 'PROFESSORS', header_format)
                worksheet.write(cur_row, cur_col, i[j])
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


                worksheet.write(head_row, cur_col, 'AVERAGE', header_format)
                worksheet.write_formula(cur_row, cur_col, "=AVERAGE(" + chr(ord("A") + start_col) + str(cur_row + 1) + ":" + chr(ord("A") + cur_col - 1) + str(cur_row + 1) + ")", final_rating_format)


    chart.add_series({'categories' : '=\''+ cur_sheet_name +'\'!$' + chr(ord("A") + start_col - 1) + '$' + str(head_row + 2) + ':$' + chr(ord("A") + start_col - 1) + '$' + str(cur_row + 1) , 'values' : '=\''+ cur_sheet_name +'\'!$' + chr(ord("A") + cur_col) + '$' + str(head_row + 2) + ':$' + chr(ord("A") + cur_col) + '$' + str(cur_row + 1)} )
    chart2.add_series({'categories' : '=\''+ cur_sheet_name +'\'!$' + chr(ord("A") + start_col - 1) + '$' + str(head_row + 2) + ':$' + chr(ord("A") + start_col - 1) + '$' + str(cur_row + 1) , 'values' : '=\''+ cur_sheet_name +'\'!$' + chr(ord("A") + cur_col) + '$' + str(head_row + 2) + ':$' + chr(ord("A") + cur_col) + '$' + str(cur_row + 1)} )
    print({'categories' : '=\''+ cur_sheet_name +'\'!$' + chr(ord("A") + start_col - 1) + '$' + str(head_row + 2) + ':$' + chr(ord("A") + start_col - 1) + '$' + str(cur_row + 1) , 'values' : '=\''+ cur_sheet_name +'\'!$' + chr(ord("A") + cur_col) + '$' + str(head_row + 2) + ':$' + chr(ord("A") + cur_col) + '$' + str(cur_row + 1)})

    worksheet.insert_chart(cur_row + 5, 1, chart)
    worksheet.insert_chart(cur_row + 5, 7, chart2)


print("Omkar")
#Plot Data
workbook.worksheets_objs.sort(key=lambda x: x.name)
workbook.close()
sys.stdout.flush()