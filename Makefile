# команда полезна при клонировании первого репозитория, (или после удаления node_modules).
install:
	npm ci

#команда запустит eslint
lint:
	npx eslint .

#команда покажет статистику покрытия кода тестами
test-coverage:
	npx jest --coverage

#команда для запуска тестов
test:
		npx jest
