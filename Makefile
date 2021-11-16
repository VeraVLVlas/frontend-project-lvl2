# команда полезна при клонировании первого репозитория, (или после удаления node_modules).
install:
	npm ci

#команда запустит eslint
lint:
	npx eslint .