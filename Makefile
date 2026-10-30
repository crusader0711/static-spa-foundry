.DEFAULT_GOAL := help
SHELL := /usr/bin/env bash

help:        ## List available targets
	@grep -E '^[a-z-]+:.*##' $(MAKEFILE_LIST) | sed -E 's/:.*##/\t/' | sort

setup:       ## Install git hooks (core.hooksPath=hooks/)
	./scripts/setup.sh

lint:        ## PII scan, JS syntax check, shellcheck
	./scripts/lint.sh

test:        ## PII-guard tests + smoke over template and every example
	./scripts/test.sh

pii-scan:    ## PII guard: generic patterns + optional PII_DENYLIST (outside the repo)
	./scripts/pii-scan.sh

build:       ## Deterministic dist/ tarballs
	./scripts/build.sh

release:     ## RELEASE_MANIFEST.json + SHA256SUMS (usage: make release VERSION=vX.Y.Z)
	./scripts/release.sh $(VERSION)

clean:       ## Remove build artifacts and caches
	rm -rf dist node_modules .smoke-deps

.PHONY: help setup lint test pii-scan build release clean
