function xsea(args)

ibatch=subwrd(args,1)

year=2016
yearend=2016

while (year<=yearend)
*
'sdfopen erai_uptp_mon_'year'.nc'
'sdfopen erai_vptp_mon_'year'.nc'
'sdfopen erai_optp_mon_'year'.nc'
* 4
'sdfopen erai_t_mon_'year'.nc'
'sdfopen erai_u_mon_'year'.nc'
'sdfopen erai_v_mon_'year'.nc'
'sdfopen erai_w_mon_'year'.nc'

'set z 1 11'
'set x 1 144'
'set y 1 73'
'set t 1 12'

'pp=lev'

'set z 2 10'

*I use eq. 3.21 in James, 1995, Circulating atmosphere 
*Neglect term1=dpt/dt
*1/(2*86400)=5.787e-6
*'define term1=(air(t+1)-air(t-1))*pow(1000/pp(z+0),0.286)*5.787e-6'

*term2=u.dpt/dx+v.dpt/dy
'pt=t.4*pow(1000/pp(z+0),0.286)'
'one=1+0*lat'
'dptdx=-muadv(one,pt)'
'dptdy=-mvadv(one,pt)'
'define term2=(u.5*dptdx)+(v.6*dptdy)'

*term3=omega.dpt/dp
'dp1=pp(z-1)-pp(z+0)'
'dp2=pp(z+0)-pp(z+1)'
'dp12=dp1+dp2'
'w1=dp2/dp12'
'w2=dp1/dp12'
'dptdp1=((t.4(z-1)*pow(1000/pp(z-1),0.286))-(t.4(z+0)*pow(1000/pp(z+0),0.286)))/dp1*0.01'
'dptdp2=((t.4(z+0)*pow(1000/pp(z+0),0.286))-(t.4(z+1)*pow(1000/pp(z+1),0.286)))/dp2*0.01'
'define term3=w.7(z+0)*((w1*dptdp1)+(w2*dptdp2))'

*term4=d(u'pt')/dx+d(v'pt')/dy
'duptpdx=-muadv(one,uptp.1)'
'dvptpdy=-mvadv(one,vptp.2)'
'define term4=duptpdx+dvptpdy'

*term5=d(omega'pt')/dp
'doptpdp1=(optp.3(z-1)-optp.3(z+0))/dp1*0.01'
'doptpdp2=(optp.3(z+0)-optp.3(z+1))/dp2*0.01'
'define term5=(w1*doptpdp1)+(w2*doptpdp2)'

*term1+term2+term3+term4+term5=diaheat
'define diaheat=term2+term3+term4+term5'
'set sdfwrite -flt erai_diaheat_mon_'year'_ver2017oct18.nc'
'sdfwrite diaheat'

say year
year=year+1

'reinit'

endwhile

if (ibatch='b')
 'quit'
endif

return
