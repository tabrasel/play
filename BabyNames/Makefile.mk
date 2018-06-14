INTEREST_YEAR='2013'

load_year_data:
	curl https://data.cityofnewyork.us/api/views/25th-nujf/rows.csv?accessType=DOWNLOAD | \
	grep $(INTEREST_YEAR) - > year_data.txt

load_names: load_year_data
	cut -d',' -f4 year_data.txt | sort -u - > baby_names.txt

generate_report: load_names
	sed 's/YEAR/$(INTEREST_YEAR)' report_template.txt > final_report.txt
	sed 's/NUM_BABIES/$/'
