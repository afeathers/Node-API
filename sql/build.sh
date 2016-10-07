DB_NAME="ipi"

echo -n -e "This will delete the database ${DB_NAME}, are you sure you want to proceed?"
read -p ' [Y/N]: ' PROCEED
if [[ "$PROCEED" != 'Y' ]]
then
    exit 1
fi

dropdb "${DB_NAME}"
createdb "${DB_NAME}"
for file in ./schema/*.sql
do
    psql --single-transaction -e -d ${DB_NAME} -v ON_ERROR_STOP=1 -f "${file}"
    if [[ $? -ne 0 ]]; then
        echo -e "\e[1;31mError executing SQL file ${file}.\e[0m"
        exit 1
    fi
done

psql --single-transaction -e -d ${DB_NAME} -v ON_ERROR_STOP=1 -f seed.sql

echo -e "\e[1;32mThe current set of SQL files are valid. You are safe to proceed.\e[0m"