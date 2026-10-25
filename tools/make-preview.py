"""Renders a Night Owl palette preview card for the README (1280x720)."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1280, 720
BG = "#011627"
LAYER1 = "#0b2942"
LAYER2 = "#0e3350"
LAYER3 = "#123a5c"
FG = "#d6deeb"
FG_DIM = "#a3b5c9"
FG_MUTED = "#7f97ab"
BLUE = "#82aaff"
PURPLE = "#c792ea"
CYAN = "#7fdbca"
GREEN = "#addb67"
ORANGE = "#f78c6c"
YELLOW = "#ecc48d"
RED = "#ef5350"

YAHEI = "C:/Windows/Fonts/msyh.ttc"
YAHEI_BOLD = "C:/Windows/Fonts/msyhbd.ttc"
CONSOLAS = "C:/Windows/Fonts/consola.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# subtle top glow
for i in range(160):
    alpha = int(14 * (1 - i / 160))
    d.rectangle([0, i, W, i + 1], fill=(11 + alpha, 41 + alpha, 66 + alpha))

f_title = font(YAHEI_BOLD, 52)
f_sub = font(YAHEI, 22)
f_h = font(YAHEI_BOLD, 19)
f_body = font(YAHEI, 17)
f_small = font(YAHEI, 15)
f_code = font(CONSOLAS, 16)
f_mono_s = font(CONSOLAS, 13)

# ---------- left column ----------
d.text((56, 52), "Night Owl", font=f_title, fill=FG)
d.text((58, 118), "for DeepSeek Harness", font=f_sub, fill=BLUE)
d.text((58, 152), "极光之后的深蓝，久看不刺眼", font=f_small, fill=FG_MUTED)

swatches = [
    ("#011627", "bg", BG),
    ("#0b2942", "layer-1", LAYER1),
    ("#0e3350", "layer-2", LAYER2),
    ("#123a5c", "layer-3", LAYER3),
]
accents = [
    ("#82aaff", "accent", BLUE),
    ("#c792ea", "keyword", PURPLE),
    ("#7fdbca", "cyan", CYAN),
    ("#addb67", "success", GREEN),
    ("#ecc48d", "warn", YELLOW),
    ("#ef5350", "error", RED),
]

y = 210
d.text((58, y), "SURFACE", font=f_h, fill=FG_DIM)
y += 30
for hexv, name, col in swatches:
    d.rounded_rectangle([58, y, 128, y + 44], radius=10, fill=col, outline="#ffffff22")
    d.text((140, y + 4), hexv.upper(), font=f_code, fill=FG)
    d.text((236, y + 6), name, font=f_small, fill=FG_MUTED)
    y += 52

y += 8
d.text((58, y), "ACCENTS", font=f_h, fill=FG_DIM)
y += 30
x = 58
for hexv, name, col in accents:
    d.rounded_rectangle([x, y, x + 44, y + 44], radius=10, fill=col)
    d.text((x, y + 50), hexv.upper(), font=f_mono_s, fill=FG_MUTED)
    x += 58

# ---------- right: mock transcript ----------
card = [470, 48, 1224, 672]
d.rounded_rectangle(card, radius=18, fill=LAYER1, outline="#ffffff14")

d.text((498, 70), "会话 · 暗色主题", font=f_h, fill=FG_DIM)

# user bubble
bub = [500, 104, 1196, 150]
d.rounded_rectangle(bub, radius=12, fill=LAYER3)
d.text((518, 115), "把插件页的配色换成 Night Owl，顺便调一下代码高亮。", font=f_body, fill=FG)

# assistant text
d.text((500, 170), "好的。深色主题已经换成 #011627 底，", font=f_body, fill=FG)
d.text((500, 196), "链接和主按钮用 #82aaff。", font=f_body, fill=FG)
d.text((716, 196), "浅色主题没有改动。", font=f_body, fill=BLUE)

# code block
code_box = [500, 232, 1196, 430]
d.rounded_rectangle(code_box, radius=12, fill="#08243a", outline="#ffffff12")
d.text((516, 244), "gen-tokens.mjs", font=f_small, fill=FG_MUTED)

lines = [
    [("const ", PURPLE), ("N ", FG), ("= {", FG_DIM)],
    [("  bg: ", FG_DIM), ("'#011627'", YELLOW), (",   ", FG_DIM), ("// base", "#637777")],
    [("  fg: ", FG_DIM), ("'#d6deeb'", YELLOW), (",   ", FG_DIM), ("// text", "#637777")],
    [("  accent: ", FG_DIM), ("'#82aaff'", YELLOW)],
    [("}", FG_DIM)],
    [("", FG)],
    [("// strings, keywords, functions", "#637777")],
]
yy = 272
for ln in lines:
    xx = 516
    for text, col in ln:
        d.text((xx, yy), text, font=f_code, fill=col)
        xx += d.textlength(text, font=f_code)
    yy += 22

# composer
comp = [500, 452, 1196, 508]
d.rounded_rectangle(comp, radius=14, fill=LAYER2, outline="#ffffff18")
d.text((518, 471), "输入消息…", font=f_body, fill=FG_MUTED)
btn = [1040, 460, 1184, 500]
d.rounded_rectangle(btn, radius=10, fill=BLUE)
d.text((1072, 469), "发送", font=f_body, fill=BG)

# status row
sy = 536
for label, col in [("成功", GREEN), ("警告", YELLOW), ("错误", RED), ("信息", CYAN)]:
    d.ellipse([500, sy + 6, 510, sy + 16], fill=col)
    d.text((518, sy), label, font=f_small, fill=FG_DIM)
    sy2 = sy
    sy += 0
    break
sx = 500
for label, col in [("成功", GREEN), ("警告", YELLOW), ("错误", RED), ("信息", CYAN)]:
    d.ellipse([sx, 542, sx + 10, 552], fill=col)
    d.text((sx + 18, 534), label, font=f_small, fill=FG_DIM)
    sx += 130

# footer hint
d.text((500, 590), "127 个 token · 浅色主题不受影响 · MIT", font=f_small, fill=FG_MUTED)
d.text((500, 618), "dsh plugin --profile desktop add dsh-plugin-night-owl", font=f_mono_s, fill=BLUE)

img.save("preview.png")
print("saved preview.png", img.size)

