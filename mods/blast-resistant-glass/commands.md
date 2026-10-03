# 防爆玻璃 — 指令 / 键值 / 设置项 对照表

> 适用版本：`xtt-xt/blast-resistant-glass` @ `防爆玻璃v0.1.0beta3`
> 方块命名空间 `reinforced_glass` ｜ 脚本包 `Script_NeteaseModY4HZxOgU` ｜ 设置主卡片 id **`reinforced_glass`**
> 指令前缀为**本模组专属** `reinforced_glass_*`（共 4 条，全部是服务端设置指令，本模组没有客户端设置指令）
> 服务端指令**不依赖前置**（值存服务端 `ExtraData`）；设置面板由前置 `CardRegistry` 提供，前置缺席时降级为「只有指令、没有面板」

---

## 1. 基础概念

| 项 | 说明 |
|---|---|
| 键格式 | `reinforced_glass.<server>.<中间卡片id>.<设置项>` |
| 示例 | `reinforced_glass.server.rg_recipe.enable_recipe_blast_glass` |
| 前缀常量 | `FULL_KEY_PREFIX = "reinforced_glass."`（指令解析统一用它） |
| 中间卡片 id | `rg_recipe`（配方）／`rg_debug`（调试） |
| 服务端存储 | `ExtraData["ReinforcedGlassSettings"]`（唯一真源，写入即 `SaveExtraData()` 落盘） |
| 写入口 | 统一走 `ApplySetting()`，指令与设置面板共用 |
| 鉴权（两层） | 指令表 `permission_level = game_directors` + 运行时 `IsOperator()`（`GetPlayerOperation() >= 2`） |
| 列表分页 | `LIST_PAGE_SIZE = 10`，当前 3 个条目 → 1 页 |
| 条目总数 | 服务端 **3** 项（本模组无客户端设置项） |
| 值类型 | 全部为 `bool` |

---

## 2. 指令总表（4 条）

全部为服务端设置指令（`permission_level = game_directors`，含命令方块／控制台）。

| 指令 | 参数 | 作用 |
|---|---|---|
| `/reinforced_glass_set` | `<键> <值> [目标]` | 修改服务端设置项（bool） |
| `/reinforced_glass_get` | `<键> [目标]` | 查询单个服务端设置项 |
| `/reinforced_glass_reset` | `<键或分组前缀> [目标]` | 重置一项或**整组**（如 `reinforced_glass.server.rg_recipe`、`reinforced_glass.server`） |
| `/reinforced_glass_list` | `[页码] [目标]` | 分页列出全部服务端设置键及当前值 |

> `list` 不接收键参数，`页码` 是第一个参数，省略即第 1 页；`页码` 非数字按第 1 页处理，越界会自动钳制。
> `[目标]` 只影响**回显给谁**，不改写设置值（服务端设置是本局全局的）。命令方块下 `@s` 为空，需填具体选择器（如 `@a`、`@p`）。
> **非本模组的设置键会静默返回**（键不以 `reinforced_glass.` 开头时直接 `return`，不抢占其他模组的指令回执）。

### 2.1 值类型写法（bool）

| 类型 | 可接受的写法 |
|---|---|
| `bool` | `true / 1 / on / yes / t`，`false / 0 / off / no / f` |

> 解析失败（例如写 `abc`）→ 返回失败并回显 `[防爆玻璃] 值格式不合法：<设置项> 需要 true/false`，原值保持不变。

---

## 3. 服务端设置项（按面板页分组，共 3 项）

全部键 = `reinforced_glass.server.<中间卡片id>.<设置项>`。

### 3.1 配方（中间卡片 `rg_recipe`，2 项）

| 设置项 | 类型 | 默认 | 面板位置 |
|---|---|---|---|
| `enable_recipe_blast_glass` | bool | `true` | 配方 ›「防爆玻璃」（关闭后不再注册该系列的染色配方） |
| `enable_recipe_tempered_glass` | bool | `true` | 配方 ›「钢化玻璃」（关闭后不再注册该系列的染色配方） |

> ⚠️ 改动后**需重启世界**才生效（染色配方在世界加载时按开关注册，运行中切换不会即时增删配方）。

### 3.2 调试（中间卡片 `rg_debug`，1 项）

| 设置项 | 类型 | 默认 | 面板位置 | 说明 |
|---|---|---|---|---|
| `debug_mode` | bool | `false` | 调试 ›「模组调试」 | 开启后服务端控制台输出 `[reinforced_glass调试]` 日志（配方注册数量、设置变更来源等） |

> 提示：客户端脚本头部注释里提到的「允许命令方块修改设置」开关，在当前版本（v0.1.0beta3）的 `SETTING_ITEMS` / `SETTING_VALUE_SCHEMA` 中**并未注册**，面板上没有该开关；命令方块写设置始终可用（见第 7 节第 6 条）。

---

## 4. 面板结构（前置 CardRegistry）

主卡片：**防爆玻璃**（`reinforced_glass`，图标 `textures/reinforced_glass`），子键统一为 `server`。

| 中间卡片 | 名称 | 覆盖的键 | 面板页说明文字 |
|---|---|---|---|
| `rg_recipe` | 配方 | `enable_recipe_blast_glass` / `enable_recipe_tempered_glass` | 两个玻璃系列的染色配方在世界加载时按开关注册，关闭后对应配方不可用 |
| `rg_debug` | 调试 | `debug_mode` | 调试日志与自定义指令相关设置，仅管理员（操作员）可修改 |

> 面板开关一律 **fail-closed**：客户端注册时先把全部开关锁定，等收到服务端下发的 `is_op` 后才为管理员解锁。
> 非 OP 在界面上的改动会被服务端**忽略**，并回发权威值纠正其 UI 显示；客户端每约 3 秒（`60 tick`）轮询一次权威值与自身 OP 状态，跟随权限变化刷新锁定。

---

## 5. 配方系统说明（与开关的关系）

- 系列：`blast_glass`（防爆玻璃）与 `tempered_glass`（钢化玻璃），与 `behavior_pack/netease_blocks/<系列>/` 目录同名。
- 染色配方：8 个环形玻璃 + 中心 1 个染料 → 8 个对应颜色的玻璃；环形材料 = 同系列基础玻璃或同系列其它颜色（同色环跳过）。
- 配方数量：每个系列 **320** 条（16 产物 × 16 环形 × 平均 1.25 种染料），两系列共 **640** 条。
- 染料：16 种染料；黑／蓝／棕／白额外接受墨囊、青金石、可可豆、骨粉。
- 注册时机：脚本初始化时注册（此时客户端尚未连接，配方随初始数据一起下发）；关卡未就绪时由 `ClientLoadAddonsFinishServerEvent` 补注册。
- 开关关系：`enable_recipe_<系列> = false` 时，该系列整体跳过注册；**改完需重启世界**。
- 遮光配方：`紫水晶 ×4 + <系列>玻璃 ×1 → 遮光<系列>玻璃 ×2`（静态配方，不受开关影响）。

---

## 6. 常用示例

```bash
# ── 查询 ──
/reinforced_glass_list                                      # 服务端设置第 1 页（共 3 项 → 1 页）
/reinforced_glass_list 2                                    # 页码越界，自动钳到第 1 页
/reinforced_glass_get reinforced_glass.server.rg_recipe.enable_recipe_blast_glass

# ── 修改（需管理员 / 命令方块 / 控制台）──
/reinforced_glass_set reinforced_glass.server.rg_recipe.enable_recipe_blast_glass false
/reinforced_glass_set reinforced_glass.server.rg_recipe.enable_recipe_tempered_glass off
/reinforced_glass_set reinforced_glass.server.rg_debug.debug_mode 1

# ── 重置（三种粒度）──
/reinforced_glass_reset reinforced_glass.server.rg_debug.debug_mode   # 单项
/reinforced_glass_reset reinforced_glass.server.rg_recipe             # 「配方」整组（2 项）
/reinforced_glass_reset reinforced_glass.server                       # 全部服务端设置（3 项）

# ── 命令方块（目标只影响回显）──
/reinforced_glass_set reinforced_glass.server.rg_debug.debug_mode true @a
```

---

## 7. 注意事项

1. **键必须写全**：`reinforced_glass.server.<中间卡片id>.<设置项>`，三段缺一不可；`set` / `get` 只接受**完整的 schema 键**（写 `rg_recipe.enable_recipe_blast_glass` 这种省略写法会返回「未知设置键」）。
2. **`list` 不传键**：`/reinforced_glass_list [页码] [目标]`；页脚为 `── 第 N/M 页 ──`，M 由条目数动态算出（当前 3 项 → 1 页）。
3. **重置粒度**：完整 schema 键 = 单项；`reinforced_glass.server.<中间卡片id>` = 该组；`reinforced_glass.server` = 全部服务端设置。
4. **权限**：指令表要求 `game_directors`（管理员/操作员、命令方块、控制台）；运行时再用 `GetPlayerOperation() >= 2` 复核，非 OP 返回 `commands.reinforced_glass.no_permission`。
5. **非本模组键静默**：`set` / `get` / `reset` 收到不以 `reinforced_glass.` 开头的键时直接返回，无任何输出（多模组共存约定）。
6. **命令方块/控制台**：无触发者（`origin.entityId` 为空）时跳过鉴权，因此命令方块可以直接改设置；此时回显写入服务端日志而不是 tellraw。
7. **无效值 / 未知键**：bool 写 `abc` → `commands.reinforced_glass.bad_value` + 明细「值格式不合法」；键不在 schema → `commands.reinforced_glass.unknown_key`。原值一律保持不变。
8. **写操作即时落盘**（`SaveExtraData()`），不需要重启游戏；只有**染色配方开关**改了要重启世界。
9. **无前置也能用**：指令与设置值全程在服务端（`ExtraData`），不依赖 CardRegistry；装了前置时指令改的值会广播给所有在线玩家，面板开关随之刷新。
10. **回显文案 key**：`commands.reinforced_glass.{set|get|reset|list}.ok` 与 `{unknown_key|bad_value|no_permission}`，三语文本在 `resource_pack/texts/{zh_CN,zh_TW,en_US}.lang`。
