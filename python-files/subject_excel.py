import urllib.request, json
import sys
sys.path.append(str(sys.path[0]) + '/XlsxWriter')
import xlsxwriter

survey_id = sys.argv[1]
col_id = sys.argv[2]
dept_id = sys.argv[3]
sem = sys.argv[4]


workbook = xlsxwriter.Workbook('public/downloads/'+str(survey_id)+"_"+str(dept_id)+"_"+str(sem)+".xlsx")
worksheet = workbook.add_worksheet()


url = "http://bvcoe-feedback.herokuapp.com/ajax/get_sub_reports?survey_id="+str(survey_id)+"&col_id="+str(col_id)+"&dept_id="+str(dept_id)+"&sem="+str(sem)

def response(url):
    with urllib.request.urlopen(url) as response:
        return response.read()

data = response(url)

jsondata = json.loads(data)

bold = workbook.add_format({'bold': True})

for i in jsondata:
    # x = Data()
    for j in i:

        if(j == 'sub_id'):
            worksheet = workbook.add_worksheet(str(i[j]))
            cur_sub_id = str(i[j])
            worksheet.write('B6', "Q ID", bold)
            worksheet.write('C6', "Question", bold)
            worksheet.write('D6', "Rating", bold)
            worksheet.write('B3', "Subject ID", bold)
            worksheet.write('C3', str(i[j]))
        elif(j == 'sub_name'):
            worksheet.write('B4', "Subject Name", bold)
            worksheet.write('C4', str(i[j]))
        elif(j == 'prof_id'):
            worksheet.write('E3', "Professor ID", bold)
            worksheet.write('F3', str(i[j]))
        elif(j == 'prof_name'):
            worksheet.write('E3', "Professor Name", bold)
            worksheet.write('F3', str(i[j]))
            b = 0
        count = 0
        a = False
        b = False
        for k in i[j]:
            if(j == "report"):
                for l in k:
                    if(l == 'q_id'):
                        worksheet.write('B'+str(6+count+1), k[l])
                    elif(l == 'qname'):
                        worksheet.write('C'+str(6+count+1), k[l])
                        a = True
                    elif(l == 'avgR'):
                        worksheet.write('D'+str(6+count+1), k[l])
                        b = True
                    if(a&b):
                        count += 1
                        a = False
                        b = False

    chart = workbook.add_chart({'type': 'pie'})
    chart.set_legend({'position': 'right'})
    chart.add_series({
        'categories' : '=\''+cur_sub_id+'\'!$C$7:$C$21',
        'values' : '=\''+cur_sub_id+'\'!$D$7:$D$21'
        })
    worksheet.insert_chart('B24', chart)

print("Omkar")

#Plot Data

workbook.worksheets_objs.sort(key=lambda x: x.name)
workbook.close()

sys.stdout.flush()



