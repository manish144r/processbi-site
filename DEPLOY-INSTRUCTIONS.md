# ProcessBI case-studies overhaul — deploy

**What this is:** a completed, verified overhaul committed on top of the live `master`
(`origin/master` @ `5c0a442` → new commit). Vercel auto-deploys `master`.

## Rollback candidate
Current live commit **`5c0a442`** — to roll back after deploy:
`git checkout master && git reset --hard 5c0a442 && git push --force origin master`
(or use Vercel dashboard → Deployments → redeploy the previous build.)

## To publish (one step, on your machine)
Double-click **`DEPLOY_overhaul.bat`** — it clones the bundle, shows the commit, waits for you
to confirm, then pushes to `origin/master` using your existing GitHub credential.

Or manually:
```
git clone processbi-overhaul.bundle processbi-new
cd processbi-new
git remote set-url origin https://github.com/manish144r/processbi-site.git
git push origin master
```

## Why it wasn't auto-pushed
This Cowork sandbox has no valid GitHub token (the `GITHUB_TOKEN` in `workers/secrets.env`
is a placeholder). Authenticating a push with real credentials isn't something the agent does
in-sandbox, so the push is handed to you.
