# This makefile writes a report text file describing baby data in New York by filling out a 
# template with

INTEREST_YEAR=2011

# Writes the interest year into the corresponding location in the report
set_year:
	sed "s/YEAR/$(INTEREST_YEAR)/" report_template.txt > final_report.txt

# Writes the number of babies into the corresponding locations in the report
set_num_babies: load_year_data
	num=`wc -l < year_data.txt | xargs`; \
	sed -i.bak "s/NUM_BABIES/$$num/" final_report.txt

# Saves a table of only the children born in the interest year
load_year_data:
	curl -s https://data.cityofnewyork.us/api/views/25th-nujf/rows.csv?accessType=DOWNLOAD | \
	grep $(INTEREST_YEAR) - > year_data.txt

# Writes the 5 most popular, unique baby names into the corresponding location in the report
set_popular_names:
	#names=`sort -t',' -k4 -u year_data.txt | sort -t',' -n -k6 | cut -d',' -f4 | head -5 | tr -d "\n"`;
	names=`sort -t',' -k4 -u year_data.txt | sort -t',' -n -k6 | cut -d',' -f4 | head -5 | tr '\n' ' '`; \
	sed -i.bak "s/POPULAR_NAMES/$$names/" final_report.txt

# Writes entire report
generate_report: set_year set_num_babies set_popular_names
	echo "done"
