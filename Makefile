PWSH  ?= powershell -NoProfile -ExecutionPolicy Bypass
OUT   ?= dist
PORT  ?= 8000

.PHONY: build clean serve status help

## Rebuild the site into $(OUT)/ from the current sources (default)
build:
	$(PWSH) -File build.ps1 -OutputDirectory $(OUT)

## Remove the generated output directory
clean:
	$(PWSH) -Command "if (Test-Path '$(OUT)') { Remove-Item -Recurse -Force '$(OUT)' }"

## Clean, then rebuild
rebuild: clean build

## Preview the built site at http://localhost:$(PORT)
serve: build
	python -m http.server $(PORT) --directory $(OUT)

## Show uncommitted changes
status:
	git status --short

help:
	@echo "make build    - rebuild $(OUT)/ (default)"
	@echo "make rebuild  - clean + build"
	@echo "make clean    - delete $(OUT)/"
	@echo "make serve    - build and preview on port $(PORT)"
	@echo "make status   - git status --short"
