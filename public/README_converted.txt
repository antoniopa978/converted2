Converted files
================

This archive contains heuristic conversions of PHP files to JavaScript (Node.js/Express handlers).
Manual review and testing are REQUIRED. The conversion attempts to:
- remove PHP tags
- map $_GET/$_POST to req.query / req.body
- convert echo -> res.write, header Location -> res.redirect
- translate some variable names ($var -> var)

LIMITATIONS:
- Complex PHP constructs, classes, frameworks, and templating will not convert cleanly.
- Database calls, includes, and framework integrations require manual rework.
