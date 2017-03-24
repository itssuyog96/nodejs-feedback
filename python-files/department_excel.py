
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

workbook = xlsxwriter.Workbook('public/downloads/' + str(survey_id)+"_"+str(dept_id)+".xlsx")

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

bold = workbook.add_format({'bold': True})

############################# PROFESSOR REPORTS #############################
url = "http://localhost:3000/ajax/get_prof_reports?survey_id="+str(survey_id)+"&col_id="+str(col_id)+"&dept_id="+str(dept_id)
print(url)

data = response(url)
jsondata = json.loads(data)

worksheet = workbook.add_worksheet('PROFESSOR REPORTS')
worksheet.set_column(2, 3, 23)
worksheet.set_column(3, 3, 55)


col_x = 2
col_y = 0
sub = 0
height = 5
prof_count = 0
sub_count = 0
if_report = False

final_rating_cells = []

for i in jsondata:
    for j in i:
        if(j == 'prof_id'):
            prof_count += 1
            col_y += sub + height
            worksheet.write(col_y-1, 2, 'PROFESSOR NAME', header_format)
            worksheet.write(col_y-1, 3, 'SUBJECT NAME', header_format)
            sub = 0
            if_report = False
            #append new table
            print('Inside professor', i[j])
        elif(j == 'prof_name'):
            #add lab name
            print('Adding professor name', i[j])
            if_report = False
            worksheet.write(col_y, 2, i[j], bold)
        elif(j == 'subjects'):
            print('Inside subjects')
            if_report = False

            for k in i[j]:
                sub += 1
                sub_count += 1
                col_x = 4
                rep_y = col_y
                rep_x = col_x
                for l in k:

                    if(l == 'sub_id'):
                        #create entry to the table of that lab
                        print('Adding subject entry')
                    elif(l == 'sub_name'):
                        #mention the subject name
                        print('Inserting sub name')
                        worksheet.write(col_y + sub - 1, 3, k[l], bold)

                    elif(l == 'reports'):
                        if_report = True
                        o = 0
                        for m in k[l]:
                            sub_total = 0
                            for n in m:
                                if(n == 'avgR'):
                                    col_x += 1
                                    o += 1
                                    sub_total += m[n]
                                    worksheet.write(col_y + sub - 1, col_x - 1, m[n], rating_format)
                                    if(sub == 1):
                                        worksheet.write(col_y-1, col_x - 1, 'Q' + str(o), header_format)
                                        worksheet.write(col_y-1, col_x, 'AVERAGE', header_format)
                            worksheet.write_formula(rep_y + sub - 1, rep_x + o, "=AVERAGE(" + chr(ord("A") + rep_x) + str(rep_y + sub) + ":" + chr(ord("A") + rep_x + o - 1) + str(rep_y + sub) + ")", rating_format)
                        y = []
                        y.append(rep_x + o)
                        y.append(rep_y + sub - 1 + 1)
                        final_rating_cells.append(y)
                        worksheet.write_formula(rep_y + sub - 1 + 1, rep_x + o, "=AVERAGE(" + chr(ord("A") + rep_x + o) + str(rep_y + 1) + ":" + chr(ord("A") + rep_x + o) + str(rep_y + sub) + ")", final_rating_format)

formula = "=AVERAGE("

for i in final_rating_cells:
    if(check_if_not_done(i)):
        formula += chr(ord("A") + i[0] ) + str(i[1]) + ","
        done.append(i)

f = list(formula)
f[len(formula) - 1] = ")"
formula = "".join(f)
print(formula)
worksheet.write((height * prof_count) + sub_count + height, 3, 'DEPARTMENT PROFESSORS AVERAGE FINAL RATING', header_format)
worksheet.write_formula((height * prof_count) + sub_count + height, 4, formula, bold)

############################# END OF PROFESSOR REPORTS #############################


############################# LABOARTORY REPORTS #############################
url = "http://localhost:3000/ajax/get_lab_reports?survey_id="+str(survey_id)+"&col_id="+str(col_id)+"&dept_id="+str(dept_id)
print(url)

data = response(url)
jsondata = json.loads(data)

worksheet = workbook.add_worksheet('LAB REPORTS')
worksheet.set_column(1, 1, 55)
worksheet.set_landscape()

col_x = 0
col_y = 3
sub = 0
height = 2
lab_count = 0
sub_count = 0
if_report = False

final_rating_cells = []

title_format = workbook.add_format()
title_format.set_bold()
title_format.set_text_wrap()
title_format.set_align('center')
title_format.set_align('vcenter')

worksheet.merge_range('B1:E1', 'BHARATI VIDYAPEETH COLLEGE OF ENGINEERING', title_format)
worksheet.merge_range('B3:E3', 'DEPARTMENT : COMPUTER', title_format)

for i in jsondata:
    for j in i:
        if(i[j] != '1001'):
            if(j == 'lab_id'):
                lab_count += 1
                col_y += sub + height
                worksheet.write(col_y-1, 0, 'LAB NAME', header_format)
                worksheet.write(col_y-1, 1, 'SUBJECT NAME', header_format)
                sub = 0
                if_report = False
                #append new table
                print('Inside lab', i[j])
            elif(j == 'lab_name'):
                #add lab name
                print('Adding lab name', i[j])
                if_report = False
                worksheet.write(col_y, 0, i[j], bold)
            elif(j == 'subjects'):
                print('Inside subjects')
                if_report = False

                for k in i[j]:
                    sub += 1
                    sub_count += 1
                    col_x = 2
                    rep_y = col_y
                    rep_x = col_x
                    for l in k:

                        if(l == 'sub_id'):
                            #create entry to the table of that lab
                            print('Adding subject entry')
                        elif(l == 'sub_name'):
                            #mention the subject name
                            print('Inserting sub name')
                            worksheet.write(col_y + sub - 1, 1, k[l], bold)

                        elif(l == 'reports'):
                            if_report = True
                            o = 0
                            for m in k[l]:
                                sub_total = 0
                                for n in m:
                                    if(n == 'avgR'):
                                        col_x += 1
                                        o += 1
                                        sub_total += m[n]
                                        worksheet.write(col_y + sub - 1, col_x - 1, m[n], rating_format)
                                        if(sub == 1):
                                            worksheet.write(col_y-1, col_x - 1, 'Q' + str(o), header_format)
                                            worksheet.write(col_y-1, col_x, 'AVERAGE', header_format)
                                worksheet.write_formula(rep_y + sub - 1, rep_x + o, "=AVERAGE(" + chr(ord("A") + rep_x) + str(rep_y + sub) + ":" + chr(ord("A") + rep_x + o - 1) + str(rep_y + sub) + ")", rating_format)
                            y = []
                            y.append(rep_x + o)
                            y.append(rep_y + sub - 1 + 1)
                            final_rating_cells.append(y)
                            worksheet.write_formula(rep_y + sub - 1 + 1, rep_x + o, "=AVERAGE(" + chr(ord("A") + rep_x + o) + str(rep_y + 1) + ":" + chr(ord("A") + rep_x + o) + str(rep_y + sub) + ")", final_rating_format)

formula = "=AVERAGE("

for i in final_rating_cells:
    if(check_if_not_done(i)):
        formula += chr(ord("A") + i[0] ) + str(i[1]) + ","
        done.append(i)

f = list(formula)
f[len(formula) - 1] = ")"
formula = "".join(f)
print(formula)
worksheet.write((height * lab_count) + sub_count + height + 4, 1, 'DEPARTMENT LAB AVERAGE FINAL RATING', header_format)
worksheet.write_formula((height * lab_count) + sub_count + height + 4, 2, formula, bold)

############################# END OF LABOARTORY REPORTS #############################

print(final_rating_cells)
sys.stdout.flush()

print("Omkar")
#Plot Data
# workbook.worksheets_objs.sort(key=lambda x: x.name)
workbook.close()
sys.stdout.flush()