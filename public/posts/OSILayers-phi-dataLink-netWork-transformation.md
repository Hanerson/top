本文为面向工程与网络学习者的详尽参考，覆盖 OSI 模型的下四层（物理层、数据链路层、网络层、传输层）。每一层均按：定义与职责、PDU 与封装、典型协议/标准、关键技术与硬件、地址与头字段、错误检测/纠正与流量控制、常见攻击与安全、调试/诊断命令与工具、优化与最佳实践、重要 RFC/标准 与 速查要点 等小节展开，便于查阅与实操应用。

目录
- 物理层（Layer 1）
- 数据链路层（Layer 2）
- 网络层（Layer 3）
- 传输层（Layer 4）
- 附录：常用协议/标准与参考 RFC/IEEE 列表
- 速查表：各层关键信息对照

---

## 总览：四层的关系与 PDU 名称
- 物理层（Layer 1）：PDU = bit（比特 / 电平 / 符号）
- 数据链路层（Layer 2）：PDU = frame（帧）
- 网络层（Layer 3）：PDU = packet（分组 / 包）
- 传输层（Layer 4）：PDU = segment（TCP）或 datagram（UDP）

封装顺序（发送）：
应用层 -> ... -> 传输层(段) -> 网络层(包) -> 数据链路层(帧) -> 物理层(比特)

解封装顺序（接收）为相反方向。

---

## 物理层

### 1. 定义与主要职责
- 将数字比特转换为物理信号在介质上传输（电压、光脉冲、无线电波等）。
- 定义物理媒体（铜缆、光纤、无线）、连接器、信号编码、传输速率、时钟/同步、物理拓扑（点到点、总线、星形等）。
- 负责比特级的传输完整性（不负责端到端的数据语义）。

### 2. PDU 与封装
- PDU：比特（0/1 或更复杂的符号）
- 帧到物理层后被转换为比特流，经编码并通过介质发送。

### 3. 典型协议 / 标准 / 规范
- IEEE 802.3（以太网 物理层子层）—— 10BASE-T, 100BASE-TX, 1000BASE-T, 10GBASE-T 等
- IEEE 802.11（Wi‑Fi 物理层规范）
- ITU-T G.652 / G.657（光纤规格）
- USB、RS‑232、DSL（ADSL、VDSL）、LTE、5G NR（物理层非常复杂）
- Bluetooth（物理射频规范）

### 4. 关键技术与硬件
- 介质：双绞线（UTP/STP）、同轴、单模/多模光纤、无线频谱（2.4/5/6 GHz、毫米波）
- 接头与接口：RJ45、RJ11、LC/SC（光纤）、SFP/SFP+/QSFP（光电收发器）
- 网卡（NIC）、收发器（PHY）、调制解调器、光模块（SFP）、放大器、交换机的物理端口、无线接入点（AP）
- 传输方式：半双工 / 全双工、单工
- 线缆特性：带宽、阻抗、衰减、近端串扰（NEXT）、远端串扰（FEXT）
- PoE（Power over Ethernet）：IEEE 802.3af/at/bt

### 5. 编码 / 调制 / 传输
- 线编码：NRZ, NRZI, Manchester, Differential Manchester
- 区分编码与调制：有线通常为线编码，光纤/无线涉及调制（QAM、PSK、FSK、OFDM）
- 多路复用：时分复用（TDM）、频分复用（FDM）、波分复用（WDM）
- 串行 vs 并行传输
- 重要理论：奈奎斯特（Nyquist）和香农（Shannon）信息论（带宽、信噪比与最大比特率关系）

Shannon 公式（速查）：
C = B * log2(1 + S/N)

### 6. 误码、同步与信号完整性
- 误码率（BER）
- 时钟同步（嵌入时钟、位填充）、帧同步（帧定界）
- 信号完整性问题：抖动、衰减、反射、插损
- 差错更正（多数由链路层或更高层处理）但物理层可支持某些 FEC（前向纠错）：Reed-Solomon、LDPC、卷积码

### 7. 常见物理层故障与排障命令/工具
- 物理检查：线缆、接口灯、接头、损伤、端接（termination）
- 测试工具：网线测试仪（线对、连通性、对齐、长度）、OTDR（光时域反射仪）
- 命令/工具（操作系统层面）：ethtool / mii-tool（链路速率、双工设置）、iwconfig / iw（Wi‑Fi）、dmesg（日记）
- 报错迹象：链路不稳定、CRC/帧错误、协商失败（duplex mismatch）

### 8. 安全考量（物理层）
- 被动窃听（在同轴或未加密无线中）
- 物理破坏/断连
- 换线攻击（插入设备）
- 访问控制（端口安全、物理安全）

### 9. 优化与最佳实践
- 正确选择线缆类型与等级（Cat5e/Cat6/Cat6A/Cat7）
- 使用合格光模块并配置速率/波长匹配
- 正确布线与接地、避免电磁干扰（EMI）
- 在以太网上避免 duplex mismatch（强制双方一致）

### 10. 速查数据（常见物理规格）
- Ethernet: 10 Mbps (10BASE‑T), 100 Mbps (100BASE‑TX), 1 Gbps (1000BASE‑T), 10 Gbps (10GBASE‑T)
- 光纤：单模（SMF）适长距离，常用 1310nm/1550nm；多模（MMF）适短距离，常用 850nm
- Connectors: RJ45 (8P8C), LC/SC, ST

---

## 数据链路层

### 1. 定义与主要职责
- 在相邻节点之间可靠地传输帧，提供介质访问控制（MAC）、帧定界、错误检测/（部分）纠正、流量控制与（在某些子层）链路管理。
- 将网络层数据包封装为帧并交给物理层发送。
- 管理逻辑链路控制与介质访问控制：IEEE 802.2（LLC）与 IEEE 802.3/802.11 的 MAC 子层。

数据链路层通常分为两个子层：
- LLC（Logical Link Control）：面向上层的抽象与多路复用（服务访问点，如 SAP）
- MAC（Media Access Control）：介质访问与地址（MAC）

### 2. PDU 与封装
- PDU：Frame（帧）。常见字段：目的 MAC、源 MAC、类型/长度、有效载荷、帧校验序列（FCS）
- 以太网帧（常见）：
  - preamble（7 字节） + SFD（1字节）
  - 目标 MAC（6字节）、源 MAC（6字节）
  - Ethertype / Length（2字节）
  - Payload（46-1500 字节，或更大使用 jumbo frames）
  - FCS (CRC32，4字节)

### 3. 典型协议 / 标准 / 术语
- 以太网：IEEE 802.3（包括 VLAN 802.1Q）
- 无线局域网：IEEE 802.11（MAC 层 + 物理）
- 点对点协议：PPP（用于串行链路）
- 帧中继（Frame Relay，已过时）
- ATM（异步传输模式，早期广泛用于链路层）
- IEEE 802.1D（STP）、802.1w（RSTP）、802.1s（MSTP）
- 802.1Q（VLAN tagging）、Q-in-Q（双标签）
- 802.1ad、802.3ad（链路聚合 / LACP）

### 4. 关键技术与硬件
- 设备：交换机（Layer 2 switch / bridge）、网卡（MAC）、桥接设备、无线接入点（AP）
- MAC 地址：48 位（EUI-48 / MAC-48），有时 EUI-64（用于 IPv6）
- CAM/MACTable：交换机学习源 MAC 与端口映射
- 存储转发（store-and-forward） vs 直通/剪切（cut-through）交换
- VLAN（虚拟局域网）：隔离广播域
- 虚拟交换/SDN 下的 L2 虚拟化（VXLAN 等属于更上层隧道）

### 5. 地址与头字段
- MAC 地址（格式：xx:xx:xx:xx:xx:xx；OUI 前 24 位标识厂商）
- Ethertype（0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP, 0x8100 = 802.1Q VLAN tag）
- VLAN Tag 構造（802.1Q）：TPID（0x8100） + TCI（12 位 VLAN ID, 3 位 PCP 优先级等）

### 6. 访问控制与介质访问方法
- CSMA/CD（Ethernet 早期的冲突检测）— 主要在半双工/集线器会发生
- CSMA/CA（Wi‑Fi 无线）— 冲突避免
- 令牌环等早期介质访问协议

### 7. 差错检测 / 纠正 与 流量控制
- FCS (通常 CRC32) 用于检测帧错误
- 链路层重传机制因协议而异：PPP 可配置 ARQ；以太网通常不在 L2 重传（依赖上层 TCP）
- Flow control：802.3x PAUSE 帧（全双工以太网流控），以及 免费/软件层面的速率限制
- 帧分段（jumboframes）和 MTU（最大传输单元）

### 8. 拓扑与环路防护
- 生成树协议（STP / RSTP / MSTP）防止二层环路
- BPDU、端口角色（Root, Designated, Blocking/Forwarding）
- VLAN 与 STP 的交互（每个 VLAN 可能运行独立实例 — PVST+ 等）

### 9. 多播与广播在 L2
- L2 广播（目标 MAC = ff:ff:ff:ff:ff:ff）
- L2 多播（以太网多播的 MAC 地址映射规则，IPv4 多播映射到 01:00:5e:xx:xx:xx）
- IGMP Snooping（交换机基于 IGMP 来限制多播转发域）

### 10. 常见攻击 / 安全问题
- MAC 欺骗 / MAC Spoofing
- ARP 欺骗 / ARP 中毒（MitM）
- VLAN Hopping（双标记攻击、交换机配置错误）
- STP 攻击（伪造 BPDU，导致拓扑改变）
- MAC Flooding（耗尽交换机 CAM 表，迫使它广播转发）
- 无线 WX 攻击（嗅探、伪基站、WEP 已破）

安全控制：
- 端口安全（port security，绑定 MAC 与端口）
- 动态 ARP 检测（DAI）
- DHCP Snooping（防止伪造 DHCP）
- Storm control、BPDU guard、root guard、MAC limit

### 11. 排障命令 / 工具
- arp -a / ip neigh（查看 ARP 缓存）
- switch: show mac address-table / show mac address-table dynamic
- show interfaces / ethtool（查看链路、错误计数）
- wireshark / tcpdump（抓取并分析帧）
- ping / traceroute（间接验证 L2）
- iperf（链路带宽测试）

### 12. 优化与最佳实践
- 合理划分 VLAN，最小化广播域
- 启用端口安全、BPDU Guard、Root Guard
- 使用链路聚合（LACP）实现带宽与冗余
- 在需要时扩展 MTU（允许 jumbo frames）并在端到端一致性地配置
- 管理交换机 CAM 表大小与老化时间

### 13. 示例：以太网帧（简化）
- 目标 MAC (6) | 源 MAC (6) | Ethertype (2) | Payload (46-1500) | FCS (4)

---

## 网络层
### 1. 定义与主要职责
- 实现不同网络之间的可达性（端到端的分组转发与路由选择）。
- 提供逻辑寻址（IP 地址）、分段/汇聚、路由（静态/动态）、分组分片、TTL/跳数、差错报告（ICMP）及多播路由支持。
- 将传输层数据报封装为包，并处理路由与转发决策。

### 2. PDU 与封装
- PDU：Packet（IP 报文）
- IPv4 包头典型字段：版本（4）、IHL、DSCP/ECN、总长度、ID、Flags/Fragment Offset、TTL、协议、头校验和、源 IP、目的 IP、选项（可选）
- IPv6 包头：版本（6）、流标签、有效载荷长度、下一个头（Next Header）、跳限、源 IPv6、目的 IPv6（扩展头用于 Fragment/Hop-by-Hop 等）

头部长度（典型）：
- IPv4 头部：最小 20 字节（无选项）
- IPv6 头部：40 字节固定

### 3. 典型协议 / 标准
- IPv4（RFC 791）、IPv6（RFC 8200）
- ICMP（RFC 792）、ICMPv6（RFC 4443）
- ARP（Address Resolution Protocol） — 实际位于 L2/L3 接合处（将 IP -> MAC）
- Neighbor Discovery Protocol (NDP) for IPv6（替代 ARP）
- 动态路由协议：RIP, OSPF, IS‑IS, EIGRP（Cisco 私有）, BGP（边界网关协议）
- MPLS（通常视为介于 L2/L3 之间的标签层）
- NAT（网络地址转换）/ PAT（端口地址转换）

### 4. 路由：控制平面 vs 转发平面
- 控制平面：运行路由协议（BGP/OSPF）以建立路由表（RIB）
- 转发平面：建立 FIB（转发表）进行速率高效的包转发
- 路由查找依据最长前缀匹配（LPM）

### 5. 地址、子网与 CIDR
- IPv4 地址：32 位，私有地址空间（RFC 1918）
- IPv6 地址：128 位，前缀表示法（/64 常见）
- 子网划分、CIDR（无类别域间路由）
- 子网掩码、网络地址、广播地址（IPv4）
- 地址配置：静态、DHCP（v4/v6）、SLAAC（IPv6）

### 6. 分片 / MTU / Path MTU Discovery
- IPv4 可以在路由器进行分片（Fragmentation），IPv6 推荐端到端不由路由器分片（源端分片 & Path MTU Discovery）
- DF（Don't Fragment）标志、ICMP Type 3 Code 4 (Fragmentation needed)
- Path MTU Discovery（PMTUD）基于 ICMP 消息调整 MSS 与分段

MSS 与 MTU 的关系（典型）：
- MTU（链路层） - IP 头 - TCP 头 = 最大 TCP 有效载荷 / MSS

### 7. 拥塞与流量工程（Network 层相关）
- MPLS TE、DiffServ（DSCP）用于 QoS 标识
- ECN（Explicit Congestion Notification）作为拥塞控制信号（需要端到端支持）

### 8. 多播 / 广播 / 任播
- IPv4 多播：IGMP（组管理） + PIM/其他多播路由协议
- IPv6 多播：MLD & PIM；IPv6 不使用广播
- 任播（Anycast）常用于 IPv6 DNS、CDN 节点

### 9. NAT 与其影响
- NAT（RFC 3022 等）将私有地址映射到公共地址（会破坏端到端可见性）
- NAT 穿越技术：STUN/TURN/ICE（用于实时媒体）、ALG（应用层网关，有时问题多）
- NAT 与 IPv6 的设计哲学差异（IPv6 鼓励逐端可达）

### 10. ICMP 与诊断
- ping（ICMP Echo Request/Reply）
- traceroute（基于逐跳 TTL 或 ICMP/TCP/UDP）
- ICMPv6 在 IPv6 中承担更多职责（NDP、重定向等）

### 11. 常见攻击 / 安全考量
- IP 欺骗（Spoofing）
- 路由协议攻击（BGP Hijacking、OSPF spoof）
- 分布式拒绝服务（DDoS）、放大攻击（UDP amplification）
- ICMP 滥用（Smurf 攻击）
- 漏洞：IP fragmentation 攻击（重组复杂性）
安全控制：
- 包过滤、防火墙（ACL）、RPF（Reverse Path Forwarding）、BGP 安全（RPKI）、黑洞/流量清洗、ACL 限制 ICMP 类型

### 12. 常见操作与排障工具
- ping, traceroute/tracert
- ip route / route / netstat -r / ip r
- tcpdump / tshark / wireshark（抓包过滤 ip）
- show ip route / show ip bgp / show ip ospf（网络设备）
- arp -a / ip neigh / ndp -a（IPv6）
- mtr（结合 ping+traceroute）

### 13. 优化与最佳实践
- 合理设计子网，使用 VLSM/CIDR 减少地址浪费
- 使用动态路由协议并配置度量/策略以优化路径
- 启用 RPKI 与 BGP 路由过滤减轻 BGP 劫持
- 在需要时使用 MPLS 与 TE 做流量工程
- 端到端 MTU 测试并启用 PMTUD

### 14. 重要 RFC / 标准参考（部分）
- RFC 791 (IPv4), RFC 8200 (IPv6), RFC 792 (ICMP), RFC 4861 (NDP)
- BGP: RFC 4271
- OSPF: RFC 2328 (OSPFv2), RFC 5340 (OSPFv3)
- MPLS: RFC 3031
- NAT: RFC 3022

---

## 传输层

### 1. 定义与主要职责
- 为端到端通信提供逻辑通道：端口号与会话管理（多路复用/解复用）。
- 提供可靠（TCP）或不可靠（UDP）传输服务：错误检测、重传、顺序控制、流量控制、拥塞控制。
- 为应用层提供抽象，如面向连接的字节流（TCP）或无连接的数据报服务（UDP）。

### 2. PDU 与封装
- PDU：Segment（TCP）或 Datagram（UDP）
- TCP 头（常见字段）：源端口、目的端口、序列号、确认号、数据偏移、保留、控制位（URG/ACK/PSH/RST/SYN/FIN）、窗口、校验和、紧急指针、选项（MSS, SACK, Window Scale, Timestamps）
- UDP 头：源端口、目的端口、长度、校验和（可选在 IPv4 中）

典型头长度：
- TCP 最小头部 20 字节（无选项）
- UDP 头部 8 字节

### 3. 主要协议与特性
- TCP（RFC 793）—— 可靠、有序、面向连接，拥塞控制与流量控制
- UDP（RFC 768）—— 无连接、尽最大努力传输、低开销（常用于实时应用）
- SCTP（RFC 4960）—— 支持多宿主、多流（常用于信令）
- DCCP（拥塞控制可配置，用于多媒体流）
- QUIC（在 UDP 之上实现的传输层特性，应用层协商）

### 4. 连接管理（TCP）
- 三次握手（3-way handshake）：SYN -> SYN+ACK -> ACK
- 四次挥手（Teardown）：FIN/ACK 序列
- 状态机（CLOSED, LISTEN, SYN-SENT, SYN-RECEIVED, ESTABLISHED, FIN_WAIT_1/2, CLOSE_WAIT, LAST_ACK, TIME_WAIT）
- TIME_WAIT 的作用：确保最后 ACK 被对端接收，避免迟到段影响新连接（端口复用）

### 5. 可靠性：确认、重传、SACK
- 确认（ACK）：累计 ACK，SACK（选择性确认）可减少重传
- 重传机制：超时重传、快速重传（基于重复 ACK）
- RTT 与 RTO：RTT 测量决定重传超时（RFC 6298 中 RTO 算法）
- TCP 选项：Window Scale（RFC 1323）、Timestamps（RTT 测量 + PAWS）、SACK（RFC 2018）

### 6. 流量控制与拥塞控制
- 流量控制：接收端窗口（rwnd）告知发送端可用缓冲区
- 拥塞控制：发送端控制（cwnd）防止网络拥塞
- TCP 拥塞算法示例：
  - 慢开始（Slow Start）
  - 拥塞避免（AIMD）
  - 快速重传与快速恢复（Reno）
  - NewReno、CUBIC（Linux 默认）、BBR（基于带宽延迟）
- ECN：标志位在 IP 层标注拥塞，端到端配合支持

### 7. 性能优化与技术
- 大 MSS / Jumbo frames 结合适当 MTU 减少开销
- TCP Offload（TSO, LRO, GRO）在 NIC 与内核运行
- Selective ACK（SACK）减少不必要重传
- Window Scaling 扩展窗口 > 64 KB（RFC 1323）
- 多路复用（HTTP/2 ／ QUIC）减少连接数开销
- 端到端加密（TLS）实现时仍在传输层/会话层之上

### 8. UDP 与无连接场景
- 低延迟应用（VoIP、视频、DNS、DHCP、SNMP）
- 应用层负责丢包恢复（FEC、ARQ）
- UDP-Lite：允许部分校验（用于多媒体）

### 9. SCTP 与特殊功能
- 多流（避免 Head‑of‑Line blocking）
- 多宿主（多路径冗余）
- 有序/无序交付选择

### 10. 常见攻击 / 安全考量
- SYN Flood（半开连接消耗资源）—— 防御：SYN cookies、速率限制
- TCP Reset 攻击（RST 注入）
- TCP Hijacking、TCP Spoofing（序列号预测）
- UDP 放大、反射（DNS/NTP/SSDP 等）
安全控制：
- 防火墙、会话表、端口过滤、TCP Hardening（限制 TIME_WAIT、SYN cookie）
- 入侵防护系统（IPS）与流量速率限制
- 使用 TLS/DTLS 保护应用层数据（防止中间人、嗅探）

### 11. 排错命令 / 工具
- netstat / ss（端口、连接与状态）
- tcpdump / tshark / wireshark（抓包并分析 TCP 三次握手、窗口、重传）
- iperf / netperf（性能测试）
- ss -t -a / ss -s 显示 TCP 概览
- lsof -i 等查找进程端口关联

### 12. 应用相关注意事项
- 端口号：0-1023(Well-known), 1024-49151(Registered), 49152-65535(Dynamic/Ephemeral)
- NAT 对 TCP/UDP 会话状态的影响（连接跟踪）
- 长连接 vs 短连接（HTTP/1.1 keep-alive / HTTP/2 多路复用 / QUIC）

### 13. 重要 RFC / 标准参考
- RFC 793 (TCP), RFC 7519 (JWT unrelated), RFC 768 (UDP), RFC 4960 (SCTP), RFC 3168 (ECN), RFC 1323 (Window Scale & Timestamps), RFC 1122/1123（主机要求）

---

## 各层交互与案例分析

### 1. 从 HTTP 请求到物理传输的典型封装（概念）
- 应用层 HTTP 请求数据 -> 传输层（TCP）加上 TCP 头（源/目的端口、序列号、ACK 等）成为 TCP 段
- 网络层（IP）在 TCP 段外包 IP 头（源/目的 IP、TTL、协议=6）
- 数据链路层在 IP 包外包以太网帧头（源/目的 MAC、Ethertype、可能 VLAN tag）并加 FCS
- 物理层将以太网帧编码成电压/光/无线信号传输
- 接收端按逆序拆包并交付给 HTTP 应用

### 2. ICMP 超时（traceroute）工作机制（与三个层的交互）
- traceroute 发送 UDP/TCP/ICMP 数据包并逐跳增加 TTL
- 路由器在 TTL 到 0 时返回 ICMP Time Exceeded（网络层 ICMP），用于发现路径
- 该机制依赖网络层的 TTL 与 ICMP 报文，但最终可用数据链路层来传输这些包

### 3. NAT 的端到端影响（网络层对传输层）
- NAT 修改 IP / 端口，导致外部对内部真实地址不可见（破坏端到端可达）
- 对于某些协议（SIP、FTP）需要应用网关或 ALG 做地址/端口重写

---

## 常见故障情形与逐层排查思路（实用）

1. 链路不通（ping 无响应）
   - 物理层：检查链路灯、网线、接口速率/双工、交换机端口状态
   - 数据链路层：检查 MAC 学习表、VLAN、端口安全、ARP 表
   - 网络层：检查 IP 配置、路由表、ACL、防火墙
   - 传输层：确认目标端口是否有服务（telnet ip port / ss / netstat）

2. 高丢包/性能差
   - 物理层：检查 BER、衰减、链路错误计数
   - 数据链路层：检查 CRC 错误、重传、冲突、半双工冲突
   - 网络层：检查路由环路、MTU 分片、拥塞、QoS 设置
   - 传输层：检查 TCP 重传、窗口缩小、慢启动、SACK 是否启用

3. 无法访问某服务但 ping 可通
   - 检查防火墙（network/host）
   - 检查服务监听端口（ss / netstat -l）
   - 检查中间 NAT / 转发配置

---

## 附录：常用协议/标准 & 参考 RFC / IEEE 列表（非穷尽）
- IEEE 802.3 — Ethernet
- IEEE 802.11 — Wireless LAN
- IEEE 802.1Q — VLAN Tagging
- IEEE 802.1D / 802.1w / 802.1s — STP / RSTP / MSTP
- RFC 791 — IPv4
- RFC 8200 — IPv6
- RFC 793 — TCP
- RFC 768 — UDP
- RFC 4271 — BGP
- RFC 2328 — OSPFv2
- RFC 4861 — IPv6 Neighbor Discovery
- RFC 2018 — TCP SACK
- RFC 1323 — TCP 高性能扩展（Window Scale/Timestamps）
- RFC 3031 — MPLS Architecture

---

## 速查表：每层关键点一页总结

物理层
- PDU: Bit
- 关键：媒介、编码、速率、接口
- 设备：NIC、线缆、光模块、交换机端口、AP
- 故障：链路灯、线缆、互连问题
- 例子：1000BASE-T, 10GBASE-SR, 802.11ax

数据链路层
- PDU: Frame
- 关键：MAC 地址、帧边界、FCS、VLAN、STP、交换机学习
- 设备：交换机、桥
- 故障：MAC 学习失败、VLAN 错误、STP 阻塞
- 例子：Ethernet 802.3, PPP, 802.11 MAC

网络层
- PDU: Packet
- 关键：IP 地址、路由、分片、TTL、ICMP、多播
- 设备：路由器、三层交换机
- 故障：路由错误、子网配置错误、MTU 问题
- 例子：IPv4/IPv6, OSPF, BGP, MPLS

传输层
- PDU: Segment / Datagram
- 关键：端口、连接管理、可靠传输、流控、拥塞控制
- 协议：TCP（可靠）、UDP（无连接）、SCTP、QUIC
- 故障：SYN Flood、重传、窗口缩小、连接不足
- 例子：TCP 三次握手、UDP 用于 DNS/VoIP

---