# 飞行之羽 — 指令 / 键值 / 设置项 对照表

> 适用版本：`xtt-xt/flight-farther` @ `7907eb0`
> 命名空间 `fly_feather` ｜ 脚本包 `Script_NeteaseModqlFm8gm2` ｜ 设置主卡片 id **`fly_armor`**
> 指令前缀已从通用的 `setting_*` 改为**本模组专属** `fly_feather_*` / `fly_feather_client_*`
> 服务端指令**不依赖前置**（值存服务端 `ExtraData`）；客户端指令也**不依赖前置**（值存玩家本机），装了前置时额外同步面板

---

## 1. 基础概念

| 项 | 说明 |
|---|---|
| 键格式 | `fly_armor.<server\|client>.<中间卡片id>.<设置项>` |
| 示例 | `fly_armor.server.fly_repair.repair_xp_fly` |
| 前缀常量 | `FULL_KEY_PREFIX = "fly_armor."`（指令、schema、镜像刷新统一用它） |
| 服务端存储 | `ExtraData["FlyArmorSettings"]`（唯一真源，写入即落盘） |
| 客户端存储 | 各玩家本机（原版 `CreateConfigClient` 本地存储：存档级、逐玩家独立；装了前置时同时写进前置面板存储） |
| 写入口 | 统一走 `ApplySetting()`，指令与 UI 共用 |
| 列表分页 | `LIST_PAGE_SIZE = 10`，页数按条目数动态计算 |
| 条目总数 | 服务端 **46** 项（5 页）／客户端 **1** 项（1 页） |

---

## 2. 指令总表（8 条）

### 2.1 服务端设置指令（`permission_level = game_directors`，含命令方块）

| 指令 | 参数 | 作用 |
|---|---|---|
| `/fly_feather_set` | `<键> <值> [目标]` | 修改服务端设置项 |
| `/fly_feather_get` | `<键> [目标]` | 查询单个服务端设置项 |
| `/fly_feather_reset` | `<键或分组前缀> [目标]` | 重置一项或**整组**（如 `fly_armor.server.fly_repair`） |
| `/fly_feather_list` | `[页码] [目标]` | 分页列出服务端设置键及当前值 |

### 2.2 客户端设置指令（`permission_level = any`，仅作用于本人）

| 指令 | 参数 | 作用 |
|---|---|---|
| `/fly_feather_client_set` | `<键> <值>` | 修改**自己**的客户端设置项 |
| `/fly_feather_client_get` | `<键>` | 查询自己的客户端设置项 |
| `/fly_feather_client_reset` | `<键或分组前缀>` | 重置自己的客户端设置项 |
| `/fly_feather_client_list` | `[页码]` | 分页列出自己的客户端设置键及当前值 |

> `list` 指令**已不需要模组id**（指令本身就是本模组专属的），页码是第一个参数，省略即第 1 页。
> `[目标]` 只影响“回显给谁 + 面板镜像刷新给谁”，**不改写哪些玩家的存储**（服务端设置是本局全局的）。命令方块下 `@s` 为空，需填具体选择器（如 `@a`、`@p`）。

### 2.3 值类型写法

| 类型 | 可接受的写法 |
|---|---|
| `bool` | `true / 1 / on / yes / t`，`false / 0 / off / no / f` |
| `int` | 整数（`repair_xp_*` 会被规范化，如 `0` 表示不消耗经验） |
| `str` | 原样；`repair_material_*` 会校验物品 id，无效则**拒绝并还原** |

---

## 3. 服务端设置项（按面板页分组，共 46 项）

全部键 = `fly_armor.server.<中间卡片id>.<设置项>`。

### 3.1 功能设置（中间卡片 `fly_effect`，7 项）

| 设置项 | 类型 | 默认 | 面板位置 |
|---|---|---|---|
| `enable_ender_effect` | bool | `true` | 功能设置 › 状态效果弹窗 ›「末影之羽状态效果」 |
| `enable_ender_full` | bool | `false` | 功能设置 › 状态效果弹窗 ›「末影之羽完整版增益」 |
| `enable_swift_effect` | bool | `true` | 功能设置 › 状态效果弹窗 ›「迅捷之羽状态效果」 |
| `enable_flight_fly` | bool | `true` | 功能设置 › 启用功能弹窗 ›「飞行之羽」 |
| `enable_flight_ender` | bool | `true` | 功能设置 › 启用功能弹窗 ›「末影之羽」 |
| `enable_flight_eternal` | bool | `true` | 功能设置 › 启用功能弹窗 ›「不朽之羽」 |
| `enable_flight_swift` | bool | `true` | 功能设置 › 启用功能弹窗 ›「迅捷之羽」 |

### 3.2 耐久设置（中间卡片 `fly_durability`，11 项）

| 设置项 | 类型 | 默认 | 面板位置 |
|---|---|---|---|
| `enable_real_time_durability` | bool | `true` | 耐久设置 ›「实时减少耐久」开关（关=飞行中累计、落地一次性结算） |
| `enable_durability_fly` | bool | `true` | 耐久设置 › 飞行耐久消耗弹窗 ›「飞行之羽」 |
| `enable_durability_ender` | bool | `true` | 耐久设置 › 飞行耐久消耗弹窗 ›「末影之羽」 |
| `enable_durability_eternal` | bool | `true` | 耐久设置 › 飞行耐久消耗弹窗 ›「不朽之羽」 |
| `enable_durability_swift` | bool | `true` | 耐久设置 › 飞行耐久消耗弹窗 ›「迅捷之羽」 |
| `enable_unbreaking_fly` | bool | `true` | 耐久设置 › 耐久附魔弹窗 ›「飞行之羽」 |
| `enable_unbreaking_ender` | bool | `true` | 耐久设置 › 耐久附魔弹窗 ›「末影之羽」 |
| `enable_unbreaking_eternal` | bool | `true` | 耐久设置 › 耐久附魔弹窗 ›「不朽之羽」 |
| `enable_unbreaking_swift` | bool | `true` | 耐久设置 › 耐久附魔弹窗 ›「迅捷之羽」 |
| `enable_effect_durability_ender` | bool | `true` | 耐久设置 ›「状态效果耐久消耗」区 ›「末影之羽」 |
| `enable_effect_durability_swift` | bool | `true` | 耐久设置 ›「状态效果耐久消耗」区 ›「迅捷之羽」 |

### 3.3 修复设置（中间卡片 `fly_repair`，16 项）

| 设置项 | 类型 | 默认 | 面板位置 |
|---|---|---|---|
| `repairable_fly` | bool | `true` | 修复设置 › 可修复的装备弹窗 ›「飞行之羽」 |
| `repairable_ender` | bool | `true` | 修复设置 › 可修复的装备弹窗 ›「末影之羽」 |
| `repairable_eternal` | bool | `true` | 修复设置 › 可修复的装备弹窗 ›「不朽之羽」 |
| `repairable_swift` | bool | `true` | 修复设置 › 可修复的装备弹窗 ›「迅捷之羽」 |
| `repair_consume_material_fly` | bool | `true` | 修复设置 › 修复时是否消耗物品弹窗 ›「飞行之羽」 |
| `repair_consume_material_ender` | bool | `true` | 修复设置 › 修复时是否消耗物品弹窗 ›「末影之羽」 |
| `repair_consume_material_eternal` | bool | `true` | 修复设置 › 修复时是否消耗物品弹窗 ›「不朽之羽」 |
| `repair_consume_material_swift` | bool | `true` | 修复设置 › 修复时是否消耗物品弹窗 ›「迅捷之羽」 |
| `repair_xp_fly` | int | `1` | 修复设置 › 修复所需经验弹窗 ›「飞行之羽」 |
| `repair_xp_ender` | int | `1` | 修复设置 › 修复所需经验弹窗 ›「末影之羽」 |
| `repair_xp_eternal` | int | `1` | 修复设置 › 修复所需经验弹窗 ›「不朽之羽」 |
| `repair_xp_swift` | int | `2` | 修复设置 › 修复所需经验弹窗 ›「迅捷之羽」 |
| `repair_material_fly` | str | `minecraft:feather` | 修复设置 › 修复所需物品id弹窗 ›「飞行之羽」 |
| `repair_material_ender` | str | `minecraft:dragon_breath` | 修复设置 › 修复所需物品id弹窗 ›「末影之羽」 |
| `repair_material_eternal` | str | `minecraft:phantom_membrane` | 修复设置 › 修复所需物品id弹窗 ›「不朽之羽」 |
| `repair_material_swift` | str | `minecraft:rabbit_foot` | 修复设置 › 修复所需物品id弹窗 ›「迅捷之羽」 |

### 3.4 配方（中间卡片 `fly_recipe`，4 项）

| 设置项 | 类型 | 默认 | 面板位置 |
|---|---|---|---|
| `enable_recipe_fly` | bool | `true` | 配方 ›「飞行之羽」开关 |
| `enable_recipe_ender` | bool | `true` | 配方 ›「末影之羽」开关 |
| `enable_recipe_eternal` | bool | `true` | 配方 ›「不朽之羽」开关 |
| `enable_recipe_swift` | bool | `true` | 配方 ›「迅捷之羽」开关 |

> ⚠️ 改动后**需重启世界**才生效（配方是加载时动态注册的）。

### 3.5 权限管理（中间卡片 `fly_permission`，6 项）

| 设置项 | 类型 | 默认 | 面板位置 |
|---|---|---|---|
| `permission_lock_mode` | bool | `true` | 权限管理 ›「锁定模式」（开=仅操作员可改设置） |
| `permission_allow_nonadmin` | bool | `false` | 权限管理 ›「非管理员可操作权限管理」 |
| `permission_visitor` | bool | `false` | 权限管理 › 允许的权限弹窗 ›「访客」 |
| `permission_member` | bool | `false` | 权限管理 › 允许的权限弹窗 ›「成员」 |
| `permission_operator` | bool | `true` | 权限管理 › 允许的权限弹窗 ›「操作员」 |
| `permission_custom` | bool | `false` | 权限管理 › 允许的权限弹窗 ›「自定义」 |

### 3.6 调试（中间卡片 `fly_debug`，2 项）

| 设置项 | 类型 | 默认 | 面板位置 |
|---|---|---|---|
| `debug_mode` | bool | `false` | 调试 ›「模组调试」开关 |
| `allow_command_block_setting` | bool | `true` | ⚠️ **面板暂无开关，仅能用指令改**：关掉后所有服务端写指令会返回“命令方块修改已被配置禁用” |

---

## 4. 客户端设置项（中间卡片 `fly_debug_client`，1 项）

键 = `fly_armor.client.fly_debug_client.<设置项>`

| 设置项 | 类型 | 默认 | 面板位置 | 存储 |
|---|---|---|---|---|
| `client_log_output` | bool | `false` | 客户端 › 调试 ›「日志输出」 | 每个玩家自己的本机存储（存档级，重进世界保留） |

---

## 5. 弹窗（CardToggle）速查

| 弹窗显示名 | 所在页 | 覆盖的键 | id |
|---|---|---|---|
| 状态效果 | 服务端 › 功能设置 | `enable_ender_effect` / `enable_ender_full` / `enable_swift_effect` | `fly_effects` |
| 启用功能 | 服务端 › 功能设置 | `enable_flight_*` ×4 | `fly_flight_enable` |
| 飞行耐久消耗 | 服务端 › 耐久设置 | `enable_durability_*` ×4 | `fly_flight_duration` |
| 耐久附魔 | 服务端 › 耐久设置 | `enable_unbreaking_*` ×4 | `fly_unbreaking` |
| 可修复的装备 | 服务端 › 修复设置 | `repairable_*` ×4 | `fly_repairable` |
| 修复时是否消耗物品 | 服务端 › 修复设置 | `repair_consume_material_*` ×4 | `fly_repair_consume` |
| 修复所需经验 | 服务端 › 修复设置 | `repair_xp_*` ×4 | `fly_repair_xp` |
| 修复所需物品id | 服务端 › 修复设置 | `repair_material_*` ×4 | `fly_repair_material` |
| 允许的权限 | 服务端 › 权限管理 | `permission_visitor/member/operator/custom` | `fly_permission_levels` |

> 弹窗内每个选项的显示名 = 羽名（飞行之羽 / 末影之羽 / 不朽之羽 / 迅捷之羽），带物品图标。

---

## 6. 常用示例

```bash
# ── 查询 ──
/fly_feather_list                           # 服务端设置第 1 页（共 5 页）
/fly_feather_list 3                         # 第 3 页
/fly_feather_get fly_armor.server.fly_repair.repair_xp_swift
/fly_feather_client_list                    # 客户端设置（自己）
/fly_feather_client_get fly_armor.client.fly_debug_client.client_log_output

# ── 修改（服务端，需管理员/命令方块）──
/fly_feather_set fly_armor.server.fly_recipe.enable_recipe_fly false
/fly_feather_set fly_armor.server.fly_repair.repair_xp_swift 4
/fly_feather_set fly_armor.server.fly_repair.repair_material_fly minecraft:gold_ingot
/fly_feather_set fly_armor.server.fly_permission.permission_member true
/fly_feather_set fly_armor.server.fly_durability.enable_real_time_durability off

# ── 修改（客户端，仅自己）──
/fly_feather_client_set fly_armor.client.fly_debug_client.client_log_output on

# ── 重置 ──
/fly_feather_reset fly_armor.server.fly_repair                 # 重置“修复设置”整页
/fly_feather_reset fly_armor.server.fly_effect.enable_ender_full   # 重置单项
/fly_feather_client_reset fly_armor.client.fly_debug_client    # 重置客户端调试页

# ── 命令方块（写指令含命令方块；目标只影响回显与镜像刷新）──
/fly_feather_set fly_armor.server.fly_effect.enable_flight_swift false @a
```

---

## 7. 注意事项

1. **键必须写全**：`fly_armor.server.<中间卡片id>.<设置项>`，三段缺一不可；中间卡片 id 用真实的（`fly_effect` / `fly_durability` / `fly_repair` / `fly_recipe` / `fly_permission` / `fly_debug` / `fly_debug_client`）。
2. **列表指令不再传模组id**：`/fly_feather_list [页码] [目标]`、`/fly_feather_client_list [页码]`；页码写非数字（例如沿用旧写法传了 `fly_armor`）会按第 1 页处理，不会报错。
3. **服务端 / 客户端指令不能混用**：把 `fly_armor.server.*` 键丢给 `fly_feather_client_set` 会提示改用 `fly_feather_*`，反之亦然；客户端指令在命令方块/控制台执行会提示“只能由玩家本人执行”。
4. **写操作即时落盘**（`_save_settings()`），不需要重启游戏；只有**配方类**（`enable_recipe_*`）改了要重启世界。
5. **无效值不写入**：bool 写 `abc`、int 写非数字 → `值格式不合法`；物品 id 写不存在的 → `物品id无效`（`repair_material_*` 专用提示）；键不存在 → `未知设置键`。原值一律保持不变。
6. **权限**：服务端指令要求 `game_directors`（管理员/操作员、命令方块、控制台）；客户端指令 `any`，但只改自己。
7. **分页显示**：每页 10 项，页脚 `── 第 N/M 页 ──`，M 由条目数动态算出（当前服务端 46 项 → 5 页）；页码越界会自动钳制并提示。
8. **无前置也能用**：服务端指令全程在服务端（`ExtraData`），客户端指令走**原版本地存储**（`CreateConfigClient`），都不依赖 CardRegistry；装了前置时，指令改的值会同时同步到设置面板（服务端走镜像刷新、客户端直写面板存储）。
9. **多模组共存**：非本模组子卡片（如 `fly_armor.blah.x.y`）**故意静默**，不抢占其他模组的指令回执。
