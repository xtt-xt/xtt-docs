---
outline: deep
---

# API 列表（总览）

> 本模组专为外部模组提供设置界面卡片注册能力。所有公开 API 均通过 `CardRegistryApi` 统一导出。
> **外部模组调用本 API 时务必遵循下方「外部模组集成要求」**，否则可能因网易多 Addon 加载顺序导致 `ImportError`。

## 模块总览

| 模块文件 | 职责 | 详细文档 |
|----------|------|----------|
| `CardRegistry.py` | 纯注册表：主卡片 / 中间卡片 / 内容项 / 弹窗 / 折叠菜单 / 事件常量 | [API_客户端.md](api-client.md) |
| `CardRegistryApi.py` | 对外门面：再导出全部公开 API + 导航/锁定/弹窗/折叠菜单便捷封装 | [API_客户端.md](api-client.md) |
| `SettingState.py` | 设置项持久化（`ConfigCompClient` 本地存储） | [API_客户端.md](api-client.md#设置项状态系统-api) |
| `Toast.py` | Toast 提示系统（叠加层显示、排队播放） | [API_客户端.md](api-client.md#toast-提示-api) |
| `DebugLog.py` | 调试日志开关（客户端/服务端独立控制，单例 `dlog`） | [API_客户端.md](api-client.md#客户端调试日志开关) |
| `setting.py` | 框架自带"设置配置"卡片注册（含客户端/服务端"调试>日志输出"开关） | [API_服务端.md](api-server.md#服务端全局调试日志开关) |
| `Server.py` | 服务端系统：处理 `/setting_open` 自定义指令 + 全局日志开关（OP 鉴权/同步） | [API_服务端.md](api-server.md) |

## 导入方式

只需导入 `CardRegistryApi` 即可获得全部公开 API，无需分别从其他模块导入：

```python
from CardRegistryApi import (
    # 主卡片
    RegisterMainCard, GetMainCard, GetAllMainCardIds, UnregisterMainCard,
    # 中间卡片
    RegisterMiddleCard, GetMiddleCardBindings, UnregisterMiddleCard,
    ClearMiddleCardBindings,
    # 整体重置
    ClearAllCards,
    # 右侧内容项
    CreateContentInst, GetContentItems, GetContentItem, ClearContentItems,
    RegisterContentItemType, GetContentItemFactory,
    RegisterContentListener, UnregisterContentListener,
    # 辅助函数
    NormalizeMiddleCardId, GetAllContentGroups,
    # 回调机制
    SetCardChangedCallback,
    # 事件常量
    SettingsUIOpenEvent, SettingsUICloseEvent,
    # 弹窗
    RegisterPopUp, UnregisterPopUp, GetPopUp, GetAllPopUpIds,
    ShowPopUp, ClosePopUp,
    # 折叠菜单
    RegisterCollapsibleMenu, AddCollapsibleMenuCard,
    GetCollapsibleMenu, GetCollapsibleMenuCards,
    ShowCollapsibleMenu, CloseCollapsibleMenu,
    # 弹窗事件常量
    PopUpOpenEvent, PopUpCloseEvent,
    # 跳转事件常量 + 跳转拦截 API
    SettingsNavigateEvent,
    RegNavigateBlockCallback, UnregNavigateBlockCallback, IsNavigateBlocked,
    # UI 构建器注册
    RegisterContentBuilder,
    # 导航 API
    OpenSettings,
    # 锁定 API
    SetLocked,
    # 设置项状态系统
    MakeSettingKey, GetSettingValue, GetSettingLocked, SetSettingValue,
    ResetSettingValue, ResetAllSettings, ResetGroupSettings,
    SaveGroupSettings, SaveAllSettings,
    # Toast 提示
    ShowToast, ToastTop, ToastTopRight, ToastUnder,
)
```

也支持 `from CardRegistryApi import *` 一键导入全部。

## API 快速索引

> 点击接口名可跳转到对应详解。

### 客户端 API（详见 [客户端 API](api-client)）

| 接口 | 说明 |
|------|------|
| **主卡片** | |
| [RegisterMainCard](api-client.md#registermaincard-unique-id-name-icon-none) | 注册一个左侧主卡片 |
| [GetMainCard](api-client.md#getmaincard-unique-id) | 获取已注册的主卡片信息 |
| [GetAllMainCardIds](api-client.md#getallmaincardids) | 获取所有已注册主卡片 ID |
| [UnregisterMainCard](api-client.md#unregistermaincard-unique-id) | 注销指定主卡片 |
| [ClearAllCards](api-client.md#clearallcards) | 清空全部卡片注册 |
| [SetCardChangedCallback](api-client.md#setcardchangedcallback-callback) | 设置卡片变更回调 |
| **中间卡片** | |
| [RegisterMiddleCard](api-client.md#registermiddlecard-main-card-id-key-card-id-name-icon-none) | 注册一个中间卡片 |
| [GetMiddleCardBindings](api-client.md#getmiddlecardbindings-main-card-id-key) | 获取中间卡片绑定 |
| [UnregisterMiddleCard](api-client.md#unregistermiddlecard-main-card-id-key-card-id) | 注销中间卡片 |
| [ClearMiddleCardBindings](api-client.md#clearmiddlecardbindings-main-card-id-key) | 清空中间卡片绑定 |
| **内容项（链式）** | |
| [CreateContentInst](api-client.md#createcontentinst-main-card-id-key-middle-card-id-none) | 创建内容项实例 |
| [ForMiddleCard](api-client.md#formiddlecard-middle-card-id) | 链式指定中间卡片 |
| [AddText](api-client.md#addtext-item-id-title-text) | 添加纯文本内容项 |
| [AddButton](api-client.md#addbutton-item-id-desc-button-text-on-click-none-locked-false-litle) | 添加按钮内容项 |
| [AddSwitch](api-client.md#addswitch-item-id-desc-default-value-false-locked-false-on-toggle-none-litle) | 添加开关内容项 |
| [AddEditBox](api-client.md#addeditbox-item-id-desc-default-value-placeholder-请输入内容-locked-false-litle) | 添加输入框内容项 |
| [AddResetButton](api-client.md#addresetbutton-item-id-popup-id-none-on-click-none) | 添加重置按钮 |
| [AddCustom](api-client.md#addcustom-item-id-type-name-kwargs) | 添加自定义内容项 |
| [AddSlider](api-client.md#addslider-item-id-desc-min-val-0-max-val-100-value-50-steps-1-locked-false-litle-on-value-change-none-slider-type-percent-value-formatter-none-value-labels-none) | 添加滑块内容项 |
| [AddCollapsibleMenu](api-client.md#addcollapsiblemenu-item-id-desc-menu-id-litle-on-select-none-default-selected-id-none-locked-false) | 添加折叠菜单内容项 |
| [Clear](api-client.md#clear) | 清空内容项 |
| [Remove](api-client.md#remove-item-id) | 移除指定内容项 |
| **内容项查询** | |
| [GetContentItems](api-client.md#getcontentitems-main-card-id-key-middle-card-id-default) | 获取内容项列表 |
| [GetContentItem](api-client.md#getcontentitem-main-card-id-key-middle-card-item-id) | 获取单个内容项 |
| [ClearContentItems](api-client.md#clearcontentitems-main-card-id-none-key-none-middle-card-id-none) | 清空内容项 |
| [GetAllContentGroups](api-client.md#getallcontentgroups) | 获取全部内容分组 |
| [NormalizeMiddleCardId](api-client.md#normalizemiddlecardid-middle-card-id) | 规范化中间卡片 id |
| **内容项扩展** | |
| [RegisterContentItemType](api-client.md#registercontentitemtype-type-name-factory) | 注册内容项类型工厂 |
| [GetContentItemFactory](api-client.md#getcontentitemfactory-type-name) | 获取内容项工厂 |
| [RegisterContentBuilder](api-client.md#registercontentbuilder-type-name-builder) | 注册内容构建器 |
| [RegisterContentListener](api-client.md#registercontentlistener-listener) | 注册内容监听器 |
| [UnregisterContentListener](api-client.md#unregistercontentlistener-listener) | 注销内容监听器 |
| **弹窗** | |
| [RegisterPopUp](api-client.md#registerpopup-popup-id-title-content-buttons-none) | 注册弹窗 |
| [UnregisterPopUp](api-client.md#unregisterpopup-popup-id) | 注销弹窗 |
| [GetPopUp](api-client.md#getpopup-popup-id) | 获取弹窗 |
| [GetAllPopUpIds](api-client.md#getallpopupids) | 获取所有弹窗 ID |
| [ShowPopUp](api-client.md#showpopup-popup-id-force-scroll-none) | 显示弹窗 |
| [ClosePopUp](api-client.md#closepopup) | 关闭弹窗 |
| **折叠菜单** | |
| [RegisterCollapsibleMenu](api-client.md#registercollapsiblemenu-menu-id-title-cards-none) | 注册折叠菜单 |
| [AddCollapsibleMenuCard](api-client.md#addcollapsiblemenucard-menu-id-card-id-name) | 追加折叠菜单卡片 |
| [GetCollapsibleMenu](api-client.md#getcollapsiblemenu-menu-id) | 获取折叠菜单 |
| [GetCollapsibleMenuCards](api-client.md#getcollapsiblemenucards-menu-id) | 获取折叠菜单卡片 |
| [ShowCollapsibleMenu](api-client.md#折叠菜单-api) | 显示折叠菜单 |
| [CloseCollapsibleMenu](api-client.md#折叠菜单-api) | 关闭折叠菜单 |
| **锁定** | |
| [SetLocked](api-client.md#setlocked-item-id-or-path-locked) | 锁定/解锁内容项 |
| **设置项状态** | |
| [MakeSettingKey](api-client.md#makesettingkey-main-card-id-key-middle-card-id-item-id) | 构建设置项 key |
| [GetSettingValue](api-client.md#getsettingvalue-main-card-id-key-middle-card-id-item-id-default-none) | 读取设置值 |
| [GetSettingLocked](api-client.md#getsettinglocked-main-card-id-key-middle-card-id-item-id-default-false) | 读取锁定状态 |
| [SetSettingValue](api-client.md#setsettingvalue-main-card-id-key-middle-card-id-item-id-value) | 写入设置值 |
| [ResetSettingValue](api-client.md#resetsettingvalue-main-card-id-key-middle-card-id-item-id) | 重置单个设置 |
| [ResetAllSettings](api-client.md#resetallsettings) | 重置全部设置 |
| [ResetGroupSettings](api-client.md#resetgroupsettings-main-card-id-key-middle-card-id) | 重置分组设置 |
| [SaveGroupSettings](api-client.md#savegroupsettings-main-card-id-key-middle-card-id) | 保存分组设置 |
| [SaveAllSettings](api-client.md#saveallsettings) | 保存全部设置 |
| **导航** | |
| [OpenSettings](api-client.md#opensettings-main-card-id-none-sub-key-none-middle-card-id-none) | 打开/导航设置界面 |
| **跳转拦截** | |
| [SettingsNavigateEvent](api-client.md#导航-api) | 跳转前置事件常量 |
| [RegNavigateBlockCallback](api-client.md#regnavigateblockcallback-callback) | 注册跳转拦截回调 |
| [UnregNavigateBlockCallback](api-client.md#unregnavigateblockcallback-callback) | 注销跳转拦截回调 |
| [IsNavigateBlocked](api-client.md#isnavigateblocked-playerid-main-card-id-sub-key-middle-card-id) | 查询是否被拦截 |
| **Toast** | |
| [ShowToast](api-client.md#toast-提示-api) | 显示 Toast 提示 |
| [ToastTop](api-client.md#toast-提示-api) | Toast 顶部显示 |
| [ToastTopRight](api-client.md#toast-提示-api) | Toast 右上角显示 |
| [ToastUnder](api-client.md#toast-提示-api) | Toast 下层显示 |

### 服务端 API（详见 [服务端 API](api-server)）

| 接口 | 说明 |
|------|------|
| [设置指令打开设置](api-server.md#指令定义) | `/setting_open` 打开/导航设置界面 |
| [服务端全局调试日志开关](api-server.md#服务端全局调试日志开关) | 控制服务端调试日志输出 |

### 事件（详见 [事件](api-events)）

| 事件 | 说明 |
|------|------|
| [设置界面事件](api-events.md#设置界面事件) | `SettingsUIOpenEvent` / `SettingsUICloseEvent` |
| [弹窗事件](api-events.md#弹窗事件) | `PopUpOpenEvent` / `PopUpCloseEvent` |
| [指令打开设置事件](api-events.md#指令打开设置事件-服务端-→-客户端) | `/setting_open`（服务端 → 客户端） |
| [调试日志开关事件](api-events.md#调试日志开关事件-客户端-↔-服务端) | 客户端/服务端调试日志开关 |

## 外部模组集成要求

### ⚠️ 禁止顶层 import

```python
# ❌ 错误：在脚本文件顶部直接 import
from Script_NeteaseMod9sPMlz0K.CardRegistry import RegisterMainCard
class MySystem(ClientSystem):
    ...
```

**原因**：网易客户端的多 Addon 加载**不保证顺序**。你的模组脚本被加载时，本模组的脚本可能尚未注册，顶层 import 会抛出 `ImportError`。

### ✅ 正确方式

在 `UiInitFinished` / `LoadClientAddonScriptsAfter` 事件中**延迟导入**，并防御性地处理 `ImportError`：

```python
class MyClientSystem(ClientSystem):

    def __init__(self, namespace, systemName):
        ClientSystem.__init__(self, namespace, systemName)
        self.ListenForEvent(
            clientApi.GetEngineNamespace(),
            clientApi.GetEngineSystemName(),
            'UiInitFinished',
            self,
            self.onUiReady
        )

    def onUiReady(self, args):
        # 延迟导入，防御对方模组未安装的情况
        try:
            from Script_NeteaseMod9sPMlz0K.CardRegistryApi import (
                RegisterMainCard, RegisterMiddleCard,
            )
        except ImportError:
            print "==== CardRegistryApi 模组未安装，跳过注册 ===="
            return

        # 注册主卡片 + 中间卡片（注册后自动刷新 UI，无需手动调用 RebuildMainCards）
        RegisterMainCard("my_mod", "我的模组", "textures/ui/sidebar_icons/addon")
        RegisterMiddleCard("my_mod", "server", "my_feat", "我的功能")
```

### 自动刷新机制

`RegisterMainCard` 和 `UnregisterMainCard` 成功执行后，`MyClientSystem` 内部会自动调用 `SettingsScreenNode.RebuildMainCards()` 刷新左侧卡片列表。

- **设置界面已打开时**：注册/注销主卡片后立即自动刷新，无需手动调用。
- **设置界面未打开时**：注册/注销操作仍然生效，下次玩家打开设置界面时（`OnActive`）会自动从注册表重建左侧卡片列表。

> 外部模组只需调用 `RegisterMainCard`/`UnregisterMainCard`，无需关心 UI 刷新逻辑。
