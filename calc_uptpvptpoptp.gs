function xsea(args)

ibatch=subwrd(args,1)

year=2016
yearend=2016

while (year<=yearend)

'sdfopen erai_t_day_'year'.nc'
'sdfopen erai_u_day_'year'.nc'
'sdfopen erai_v_day_'year'.nc'
'sdfopen erai_w_day_'year'.nc'
*
'sdfopen erai_t_mon_'year'.nc'
'sdfopen erai_u_mon_'year'.nc'
'sdfopen erai_v_mon_'year'.nc'
'sdfopen erai_w_mon_'year'.nc'

'set z 1 11'
'set x 1 144'
'set y 1 73'
'set t 1 365'
'pp=lev'
'ptprime=(t.1-t.5)*pow(1000/pp(z+0),0.286)'
'uprime=u.2-u.6'
'vprime=v.3-v.7'
'omegaprime=w.4-w.8'
'optp1=omegaprime*ptprime'

*I use eq. 3.21 in James, 1995, Circulating atmosphere 

'uptp1=uprime*ptprime'
'vptp1=vprime*ptprime'

'define uptp=uptp1'
'set sdfwrite -flt erai_uptp_day_'year'.nc'
'sdfwrite uptp'

'define vptp=vptp1'
'set sdfwrite -flt erai_vptp_day_'year'.nc'
'sdfwrite vptp'

'define optp=optp1'
'set sdfwrite -flt erai_optp_day_'year'.nc'
'sdfwrite optp'

year=year+1
say year

'reinit'

endwhile

if (ibatch='b')
 'quit'
endif

return
