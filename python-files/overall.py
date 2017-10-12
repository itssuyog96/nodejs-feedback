import urllib.request, json
import sys
sys.path.append(str(sys.path[0]) + '/XlsxWriter')
import xlsxwriter

survey_id = sys.argv[1]
col_id = sys.argv[2]



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

url = "http://localhost:3000/ajax/getQuestions"
print(url)

workbook = xlsxwriter.Workbook("public/downloads/" + str(survey_id)+"_overall.xlsx")

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



overallq = dict()
ssq = dict()

data = response(url)
jsondata = json.loads(data)
for i in jsondata:
    if(int(i['qid']) > 300 and int(i['qid']) < 400):
        overallq[str(i['qid'])] = i['question']
    if(int(i['qid']) > 400 and int(i['qid']) < 500):
        ssq[str(i['qid'])] = i['question']


############################# OVERALL REPORTS #############################
url = "http://localhost:3000/ajax/get_overall_reports?survey_id="+str(survey_id)+"&col_id="+str(col_id)
print(url)

data = response(url)
jsondata = json.loads(data)

worksheet = workbook.add_worksheet('REPORTS')
worksheet.set_column(1, 1, 55)
# worksheet.set_landscape()

col_x = -1
col_y = 5
sub = 0
height = 2

title_format = workbook.add_format()
title_format.set_bold()
title_format.set_text_wrap()
title_format.set_align('center')
title_format.set_align('vcenter')

worksheet.merge_range('A1:D1', 'BHARATI VIDYAPEETH COLLEGE OF ENGINEERING', title_format)
worksheet.merge_range('A3:D3', 'SURVEY : ' + str(survey_id), title_format)
worksheet.merge_range('A5:D5', 'OVERALL', header_format)


for i in jsondata:
    for j in i:
        if(j == 'report'):
            for k in i[j]:
                print(overallq[k['q_id']], k['avgR'])
                worksheet.write(col_y, col_x + 1, k['q_id'])
                col = 'B'+str(col_y+1)+':C'+str(col_y+1)
                print(col)
                q = overallq[k['q_id']]
                worksheet.merge_range(str(col), str(q))
                worksheet.write(col_y, col_x + 4, k['avgR'], rating_format)
                col_y += 1

############################# END OF OVERALL REPORTS #############################

############################# STUDENT SERVICES REPORTS #############################

url = "http://localhost:3000/ajax/get_student_sec_reports?survey_id="+str(survey_id)+"&col_id="+str(col_id)
print(url)

data = response(url)
jsondata = json.loads(data)

worksheet.merge_range('A20:D20', 'STUDENT SERVICES', header_format)
col_y = 20

for i in jsondata:
    for j in i:
        if(j == 'report'):
            for k in i[j]:
                print(ssq[k['q_id']], k['avgR'])
                worksheet.write(col_y, col_x + 1, k['q_id'])
                col = 'B'+str(col_y+1)+':C'+str(col_y+1)
                print(col)
                q = ssq[k['q_id']]
                worksheet.merge_range(str(col), str(q))
                worksheet.write(col_y, col_x + 4, k['avgR'], rating_format)
                col_y += 1

############################# END OF STUDENT SERVICES REPORTS #############################
worksheet.conditional_format('A5:Z80', {'type': 'cell', 'criteria': 'between', 'minimum': 1, 'maximum' : 3, 'format':   format1})
workbook.close()