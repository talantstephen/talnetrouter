# TalNet Router - FREE AI Router & Token Saver

**Never stop coding. Save 20-40% tokens with RTK + auto-fallback to FREE & cheap AI models.**

**Connect All AI Code Tools (Claude Code, Cursor, Antigravity, Copilot, Codex, Gemini, OpenCode, Cline, OpenClaw...) to 40+ AI Providers & 100+ Models.**

[![npm](https://img.shields.io/npm/v/talnetrouter.svg)](https://www.npmjs.com/package/talnetrouter)
[![Downloads](https://img.shields.io/npm/dm/talnetrouter.svg)](https://www.npmjs.com/package/talnetrouter)
[![Docker Pulls](https://img.shields.io/docker/pulls/talantstephen/talnetrouter.svg?logo=docker&label=Docker%20pulls)](https://hub.docker.com/r/talantstephen/talnetrouter)
[![GHCR](https://img.shields.io/badge/GHCR-talantstephen%2Ftalnetrouter-blue?logo=github)](https://github.com/talantstephen/talnetrouter/pkgs/container/talnetrouter)
[![License](https://img.shields.io/npm/l/talnetrouter.svg)](https://github.com/talantstephen/talnetrouter/blob/main/LICENSE)

[🌐 GitHub](https://github.com/talantstephen/talnetrouter) • [📖 Full Docs](https://github.com/talantstephen/talnetrouter)

---

## 🤔 Why TalNet Router?

**Stop wasting money, tokens and hitting limits:**

- ❌ Subscription quota expires unused every month
- ❌ Rate limits stop you mid-coding
- ❌ Tool outputs (git diff, grep, ls...) burn tokens fast
- ❌ Expensive APIs ($20-50/month per provider)

**TalNet Router solves this:**

- ✅ **RTK Token Saver** - Auto-compress tool_result, save 20-40% tokens
- ✅ **Maximize subscriptions** - Track quota, use every bit before reset
- ✅ **Auto fallback** - Subscription → Cheap → Free, zero downtime
- ✅ **Multi-account** - Round-robin between accounts per provider
- ✅ **Universal** - Works with any OpenAI/Claude-compatible CLI

---

## ⚡ Quick Start

**Option 1 — npm (recommended for desktop):**

```bash
npm install -g talnetrouter
talnetrouter

# Legacy alias still works
9router

# Or run directly with npx
npx talnetrouter
```

**Option 2 — Docker (server/VPS):**

```bash
docker run -d --name talnetrouter -p 20128:20128 \
  -v "$HOME/.talnetrouter:/app/data" -e DATA_DIR=/app/data \
  talantstephen/talnetrouter:latest
```

Published images: [Docker Hub](https://hub.docker.com/r/talantstephen/talnetrouter) • [GHCR](https://github.com/talantstephen/talnetrouter/pkgs/container/talnetrouter) (multi-platform amd64/arm64).

🎉 Dashboard opens at `http://localhost:20128`

**2. Connect a FREE provider (no signup needed):**

Dashboard → Providers → Connect **Kiro AI** (free Claude unlimited) or **OpenCode Free** (no auth) → Done!

**3. Use in your CLI tool:**

```
Claude Code/Codex/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key:  [copy from dashboard]
  Model:    kr/claude-sonnet-4.5
```

That's it! Start coding with FREE AI models.

---

## 🚀 CLI Options

```bash
talnetrouter                    # Start with default settings
talnetrouter --port 8080        # Custom port
talnetrouter --no-browser       # Don't open browser
talnetrouter --skip-update      # Skip auto-update check
talnetrouter --help             # Show all options
```

**Dashboard**: `http://localhost:20128/dashboard`

---

## 🛠️ Supported CLI Tools

Claude-Code • OpenClaw • Codex • OpenCode • Cursor • Antigravity • Cline • Continue • Droid • Roo • Copilot • Kilo Code • Gemini CLI • Qwen Code • iFlow • Crush • Crusher • Aider

Any tool supporting OpenAI/Claude-compatible API works.

---

## 💾 Data Location

- **macOS/Linux**: `~/.talnetrouter/db/data.sqlite` (legacy `~/.9router` auto-migrated on first start)
- **Windows**: `%APPDATA%/talnetrouter/db/data.sqlite`
- **Docker**: `/app/data/db/data.sqlite` (mount `$HOME/.talnetrouter` to persist)

---

## 📚 Documentation

Full docs, advanced setup, video tutorials & development guide:

- **GitHub**: https://github.com/talantstephen/talnetrouter
- **Full README**: https://github.com/talantstephen/talnetrouter/blob/main/README.md

---

## 🙏 Acknowledgments

- **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** - Original Go implementation

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
