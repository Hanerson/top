# BTree 实现源码详细注释分解

本文件将上文完整的 BTree Java 实现按方法和注释分块，方便逐步理解其 B-树结构、查找与插入核心逻辑。

## 1. 类声明与基本成员

```java
public class BTree {
    private final int degree;      // 最小度数 t，决定节点最大/最小容量
    private BTreeNode root;        // 树的根节点
}
```
- degree：B树最小度数 t，决定每个节点最少/最多存储的 key 数量和子节点数量。t 必须 >= 2。
- root：树的根节点，类型为 BTreeNode。

---

## 2. 构造与初始化

```java
    public BTree(int degree) {
        if (degree < 2) {
            throw new IllegalArgumentException("BTree degree must be >= 2");
        }
        this.degree = degree;
        this.root = new BTreeNode(true); // 初始化为叶节点
    }

    public BTree(int degree, BTreeNode root) {
        if (degree < 2) {
            throw new IllegalArgumentException("BTree degree must be >= 2");
        }
        this.degree = degree;
        this.root = root;
    }
```
- 保证度数 t 合法。
- 支持构造空树（根初始化为叶节点）和测试用带初始根的构造。

---

## 3. 查找逻辑

### 对外查找接口
```java
    public boolean search(int key) {
        return search(root, key);
    }
```
- 从根节点开始递归查找 key 是否存在。

### 递归查找实现
```java
    private boolean search(BTreeNode node, int key) {
        int i = 0;
        // 找到第一个 keys[i] >= key 的下标
        while (i < node.keys.size() && key > node.keys.get(i)) {
            i++;
        }

        // 当前节点命中
        if (i < node.keys.size() && key == node.keys.get(i)) {
            return true;
        }

        // 叶节点未命中即不存在
        if (node.isLeaf) {
            return false;
        }

        // 递归进入对应子节点
        return search(node.children.get(i), key);
    }
```
- 顺序查找键，判断是否命中或递归到子节点。
- children.size() == keys.size() + 1。

---

## 4. 插入逻辑

### 插入对外接口
```java
    public BTreeNode insert(int key) {
        BTreeNode r = root;

        // 根已满时先分裂
        if (r.keys.size() == 2 * degree - 1) {
            BTreeNode s = new BTreeNode(false); // 新根（内部节点）
            s.children.add(r);                  // 原根变为新根的首孩子
            splitChild(s, 0, r);                // 分裂原根
            root = s;                           // 更新根为新节点
            insertNonFull(s, key);              // 在新根插入
        } else {
            insertNonFull(r, key);
        }

        return root;
    }
```
- 当根节点已满时，分裂根为新根，树高加一，否则普通插入递归。
- 分裂操作会导致树结构变化，插入后返回新根。

---

### 子节点分裂（核心分裂逻辑）
```java
    private void splitChild(BTreeNode parent, int i, BTreeNode fullChild) {
        BTreeNode newNode = new BTreeNode(fullChild.isLeaf);

        // fullChild 的后 t-1 个 key 移入 newNode
        for (int j = 0; j < degree - 1; j++) {
            newNode.keys.add(fullChild.keys.remove(degree));
        }

        // 若非叶子节点，后 t 个子节点也移入 newNode
        if (!fullChild.isLeaf) {
            for (int j = 0; j < degree; j++) {
                newNode.children.add(fullChild.children.remove(degree));
            }
        }

        // 中间 key 上移到 parent
        int middleKey = fullChild.keys.remove(degree - 1);
        parent.keys.add(i, middleKey);            // 插入到 parent.keys
        parent.children.add(i + 1, newNode);      // newNode 插入 parent.children

        // 分裂完成：fullChild 和 newNode 均拥有 degree-1 个 key
    }
```
- **前提**：分裂前 fullChild 必满（2t-1 个 key）。
- 将 fullChild 的后半 key/children 移入新节点 newNode。
- 中间 key “上升”至父亲节点，父亲孩子队列也多一个。
- 分裂后原节点和新节点都不满，有利后续插入。

---

### 递归插入到未满节点
```java
    private void insertNonFull(BTreeNode node, int key) {
        int i = node.keys.size() - 1;

        if (node.isLeaf) {
            node.keys.add(0); // 临时占位，后续会覆盖
            while (i >= 0 && key < node.keys.get(i)) {
                node.keys.set(i + 1, node.keys.get(i)); // 后移
                i--;
            }
            node.keys.set(i + 1, key); // 插入新键
        } else {
            // 确定下一个目标子节点
            while (i >= 0 && key < node.keys.get(i)) {
                i--;
            }
            i++; // 进入 children[i]

            BTreeNode child = node.children.get(i);
            if (child.keys.size() == 2 * degree - 1) {
                splitChild(node, i, child); // 分裂已满子节点

                // 插入位置修正（决定进入哪个分裂后的孩子）
                if (key > node.keys.get(i)) {
                    i++;
                }
            }
            insertNonFull(node.children.get(i), key); // 递归继续
        }
    }
```
- 按需分裂目标子节点，持续递归找到叶节点插入。
- 叶节点插入时，保持 keys 有序。

---

## 5. 总结
该实现遵循标准的 B-树查找与插入算法，支持高效动态分裂节点。由于未实现删除逻辑，保证了所有节点满足 B树的度数和有序性。

**依赖说明**  
- 需配合同包下的 BTreeNode 类使用，其通常定义为：
  - List<Integer> keys：存储 keys
  - List<BTreeNode> children：存储子节点
  - boolean isLeaf：是否为叶子节点

  - 注：如需补充 BTreeNode 的定义结构，可根据上述描述自行完善。

---