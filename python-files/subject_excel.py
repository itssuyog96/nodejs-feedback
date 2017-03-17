#import urllib.request
import json
import sys
import xlsxwriter
import requests
sys.path.append(str(sys.path[0]) + '/XlsxWriter')

survey_id = sys.argv[1]
col_id = sys.argv[2]
dept_id = sys.argv[3]
sem = sys.argv[4]

def response(url):
    with urllib.request.urlopen(url) as response_new:
        return response_new.read()

workbook = xlsxwriter.Workbook(str(survey_id)+"_"+str(dept_id)+"_"+str(sem)+".xlsx")
worksheet = workbook.add_worksheet()

url = "http://localhost:80/ajax/get_sub_reports?survey_id="+str(survey_id)+"&col_id="+str(col_id)+"&dept_id="+str(dept_id)+"&sem="+str(sem)

#data = response(url)
res = requests.get(url)
jsondata = json.loads(res.text)

for i in jsondata:
    # x = Data()
    for j in i:
        if j == 'sub_id':
            worksheet = workbook.add_worksheet(str(i[j]))
            worksheet.write('B6', "Q ID")
            worksheet.write('C6', "Question")
            worksheet.write('D6', "Rating")
            worksheet.write('B3', "Subject ID")
            worksheet.write('C3', str(i[j]))
        elif j == 'prof_id':
            worksheet.write('E3', "Professor ID")
            worksheet.write('F3', str(i[j]))
            b = 0
        count = 0
        a = False
        b = False
        for k in i[j]:
            if j == "report" :
                for l in k:
                    if l == 'q_id' :
                        worksheet.write('B'+str(6+count+1), str(k[l]))
                        worksheet.write('C'+str(6+count+1), k[l])
                        a = True
                    elif l == 'avgR' :
                        worksheet.write('D'+str(6+count+1), str(k[l]))
                        b = True
                    if a & b:
                        count += 1
                        a = False
                        b = False

print("Omkar")

#Plot Data

workbook.worksheets_objs.sort(key=lambda x: x.name)
workbook.close()

sys.stdout.flush()