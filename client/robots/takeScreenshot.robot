*** Settings ***
Library     SeleniumLibrary


*** Variables ***
${BROWSER}      chrome
${DELAY}        3


*** Keywords ***
Take Screenshot
    [Arguments]    ${url}    ${filename}
    ${image_name}=    Set Variable    screenshots/${filename}.png
    Open Browser    ${url}    ${BROWSER}
    Maximize Browser Window
    Sleep    ${DELAY}
    Capture Page Screenshot
    ...    ${image_name}
    Close Browser
