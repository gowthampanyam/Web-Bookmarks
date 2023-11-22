*** Settings ***
Library             SeleniumLibrary
Library             DatabaseLibrary
Library             String
Resource            takeScreenshot.robot

Suite Setup         Connect To Database    pymysql    ${DB_NAME}    ${DB_USERNAME}    ${DB_PASSWORD}    ${DB_HOST}    ${DB_PORT}
Suite Teardown      Disconnect From Database


*** Variables ***
${BROWSER}          chrome
${DELAY}            3
${DB_HOST}          localhost
${DB_PORT}          3306    
${DB_NAME}          web_bookmarks
${DB_USERNAME}      admin
${DB_PASSWORD}      WebBookmarks123


*** Test Cases ***
Get Websites
    ${websites}=    Query    SELECT url FROM website;
    FOR    ${website}    IN    @{websites}
        ${url}=    Set Variable    ${website[0]}
        ${filename}=    Set Variable    ${url.split('//')[1].replace('www.', '').split('.')[0]}
        Run Keyword And Ignore Error    Take Screenshot    ${url}    ${filename}
    END
