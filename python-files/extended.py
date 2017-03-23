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

sems = [4, 6, 8]

for sem in sems:
    workbook = xlsxwriter.Workbook('public/downloads/'+str(survey_id)+"_"+str(dept_id)+"_sem_"+str(sem)+".xlsx")
    ############################# WHOLE REPORTS #############################

    url = "http://localhost:3000/ajax/get_whole_reports?survey_id="+str(survey_id)+"&col_id="+str(col_id)+"&dept_id="+str(dept_id)+"&sem="+str(sem)
    print(url)

    data = response(url)
    jsondata = json.loads(data)


    cur_col = 0
    head_row = 1

    for i in jsondata:
        for j in i:

            if(j == 'q_id'):


                header_format = workbook.add_format()
                header_format.set_align('center')
                header_format.set_bold()
                header_format.set_border(0)
                header_format.set_rotation(90)

                rating_format = workbook.add_format()
                rating_format.set_align('center')
                rating_format.set_bg_color('#F0EDCC')



                bold = workbook.add_format({'bold': True})
                s = sem
                worksheet = workbook.add_worksheet('Q - ' + str(i[j]))
                # worksheet.set_column(0, 14, 20)
                #worksheet.conditional_format('B3:O66', {'type': 'cell', 'criteria': 'between', 'minimum': 0.5, 'maximum' : 3, 'format':   format1})
                worksheet.set_row(1, 225)
                cur_row = head_row
                cur_col = 0
            elif(j == 'reports'):
                for l in i[j]:
                    for m in l:
                        print(m)
                        if(m == 'sub_id'):
                            cur_col += 1
                            cur_row = head_row
                            worksheet.write(head_row - 1, cur_col, l[m])
                            print(l[m])
                        elif(m == 'sub_name'):
                            worksheet.write(head_row, cur_col, l[m], header_format)

                            print(l[m])
                        elif(m == 'ratings'):
                            for o in l[m]:
                                cur_row += 1
                                worksheet.write(cur_row, cur_col, o, rating_format)





    ############################# END OF WHOLE REPORTS #############################

    print("Omkar")
    #Plot Data
    workbook.worksheets_objs.sort(key=lambda x: x.name)
    workbook.close()

sys.stdout.flush()