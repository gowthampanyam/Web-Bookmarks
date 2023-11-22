*** Settings ***
Library     SeleniumLibrary
Library     String
Resource    takeScreenshot.robot


*** Variables ***
${url}      https://translate.google.com/


*** Test Cases ***
Take Single
    ${filename}=    Set Variable    ${url.split('//')[1].replace('www.', '').split('.')[0]}
    Run Keyword And Ignore Error    Take Screenshot    ${url}    ${filename}
