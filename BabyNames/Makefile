load_unique_names:
	curl https://data.cityofnewyork.us/api/views/25th-nujf/rows.csv?accessType=DOWNLOAD > baby_data.txt; \
	cut -d',' -f4 baby_data.txt | sort -u - > baby_names.txt
