test:
	node tests/basictests.js

pushall:
	git push origin master && npm publish

run-workspace:
	wzrd tools/workspace.js -- -d
