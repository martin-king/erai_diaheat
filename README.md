# erai_diaheat
General steps.
1. Download 6hrly nc data.
2. Create daily and monthly means of u, v, omega, T, using cdo_daymonmean.py.
3. Run calc_uptpvptpoptp.gs, which produces daily data of uptp, vptp, optp year by year.
4. Create monthly means files of uptp, vptp, optp using cdo_monmean_diaheat.py.
4.5 Run calc_diaheat.gs, which produces monthly mean diaheat year by year.
5. Merge yearly files of monthly means to erai_diaheat_mon_1979_2015.nc using cdo mergetime.

NB. The outputs are in potential temperature K/s. Convert to temperature K/day by multiplying with the factor 86400*(1000hPa/p)^(-0.286).

NB. calc_diaheat.gs uses muadv and mvadv functions, so OpenGrads is used here.
