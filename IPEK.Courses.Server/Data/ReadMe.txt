﻿Создать миграцию:
1. Перейти в Консоль диспетчера пакетов
2. Выбрать Проект по умолчанию TrainingList.Data
3. Перейти в папку src\TrainingList
4. Выполнить команду:
add-migration Initial (Название миграции)

Удалить миграции: 
1 - 3 Выше
4. Выполнить команду:
Remove-Migration

Сгенерировать скрипт миграции:
Script-Migration

При создании миграции она автоматически применяется на БД, поэтому стоит иметь бэкап БД, чтоб восстановить.

Применить миграцию на БД:
Update-Database
(при запуске database update на чистой базе, убедиться что в "ApplicationDbContext.cs -> ApplicationDbContext(...)" закоментирован "Database.EnsureCreated();")