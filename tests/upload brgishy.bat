REM SET SERVER=https://crack-cherry.hyperdev.space
SET SERVER=https://pebble-online-users.herokuapp.com

SET CONTENT_HEADER=-H "Content-Type: application/json"
SET SECRET_HEADER=-H "secret: 5b7687fd-9ddf-4b69-a1f7-5646527bbe34"

curl -X POST %CONTENT_HEADER% %SECRET_HEADER% -d @brgishy.json %SERVER%/update_status

pause
