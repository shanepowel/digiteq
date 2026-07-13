# Konduit legal / company update

`cursor[bot]` cannot push to `shanepowel/konduit` (403). Apply these changes locally:

```bash
cd /path/to/konduit
git checkout -b cursor/legal-company-update-7182
git am /path/to/digiteq/docs/konduit-legal-update/0001-konduit-legal-company-update.patch
git push -u origin HEAD
```

The patch includes:

- `src/lib/company-config.ts` — shared Digiteq Holdings company config
- `FOOTER_LEGAL.md` — footer / JSON-LD reference snippets
- Brand-specific privacy, terms, and cookie policies (markdown)
- Footer + Organization JSON-LD wired to `legalFooter("Konduit")` and 66 Paul Street

> Note: source copies are intentionally not checked into Digiteq — only the patch —
> so Next.js typechecking does not pick up Konduit `@/` imports.
