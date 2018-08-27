import datetime
print "module load cdo"
print "module load nco"
print "module load ncarg"

years=range(2016,2017)

var='optp'

for y in years:
 for m in range(1,13):
  mm=str(m).zfill(2)
  d=31
  if (m==4) | (m==6) | (m==9) | (m==11):
   d=30
  elif (y%4==0) & (m==2):
   d=29
  elif (m==2):
   d=28
  hh1=(datetime.date(y,m,15)-datetime.date(1900,1,1)).days*24
  print "cdo -O  monmean -selsmon,"+mm+" erai_"+var+"_day_"+str(y)+".nc rub.nc"
  print "ncl 'timed="+str(hh1)+"'"+" "+"'"+"file_in="+'"'+"rub.nc"+'"'+"' edit_time.ncl"
  print "mv rub.nc "+mm+".nc"
#  print "ncpdq -O -U rub.nc "+mm+".nc"
# print "ncrcat ??.nc diaheat_mon_"+str(y)+".nc"
 print "cdo -O mergetime ??.nc erai_"+var+"_mon_"+str(y)+".nc"
 print 'ncatted -a units,time,o,c,"hours since 1900-01-01 00:00:00" erai_'+var+'_mon_'+str(y)+".nc"
 print "rm -f ??.nc"

#print "cdo -O  mergetime diaheat_mon_????.nc diaheat_mon_1948_2012.nc"
#print "rm -f diaheat_mon_????.nc"
