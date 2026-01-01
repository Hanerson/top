# AVL 树 — Java 实现手册 与 参考代码

本文件以 Java 为主要语言，包含：
- AVL 树的 API 设计建议
- 完整、可运行的泛型 Java 实现（AVLTree.java）
- 示例主函数（Main.java）
- 简单 JUnit5 测试（AVLTreeTest.java）
- 验证/调试工具（BST 与 AVL 验证）
- 复杂度与使用说明

-------------------------
## 设计要点（API）
推荐类与方法（面向消费者）：

```java
class AVLTree<K extends Comparable<K>, V> {

    public V put(K key, V value); //插入或更新，返回旧值（若有）

    public V get(K key);

    public boolean containsKey(K key);

    public V remove(K key); //删除并返回被删除的值

    public int size();

    public List<K> inOrderKeys();

    public void clear();

    public boolean validateAVL();//验证 AVL 平衡性质（调试用）

    public boolean validateBST();//验证 BST 序

}
```

实现细节：
- 节点存储：key, value, left, right, height, size（子树节点数）
- 空节点高度约定为 0，叶子节点高度为 1（实现中以此约定）
- 对重复 key：put 更新 value（不允许重复 key 存为多节点），可按需改为计数或链表

-------------------------
## 源码：AVLTree.java（泛型实现）
```java
package avltree;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * AVLTree: Generic AVL Tree implementation in Java.
 * K must be Comparable.
 *
 * Height convention: null -> 0, leaf -> 1
 */
public class AVLTree<K extends Comparable<K>, V> {

    private static class Node<K,V> {
        K key;
        V value;
        Node<K,V> left, right;
        int height; // 1 for leaf
        int size;   // number of nodes in subtree rooted here

        Node(K key, V value) {
            this.key = key;
            this.value = value;
            this.height = 1;
            this.size = 1;
        }
    }

    private Node<K,V> root;
    private int modCount = 0;

    public AVLTree() { this.root = null; }

    // Public API

    public int size() {
        return nodeSize(root);
    }

    public boolean isEmpty() { return root == null; }

    public V put(K key, V value) {
        Objects.requireNonNull(key);
        V old = get(key);
        root = insert(root, key, value);
        modCount++;
        return old;
    }

    public V get(K key) {
        Objects.requireNonNull(key);
        Node<K,V> cur = root;
        while (cur != null) {
            int cmp = key.compareTo(cur.key);
            if (cmp == 0) return cur.value;
            cur = (cmp < 0) ? cur.left : cur.right;
        }
        return null;
    }

    public boolean containsKey(K key) {
        return get(key) != null;
    }

    public V remove(K key) {
        Objects.requireNonNull(key);
        V old = get(key);
        if (old != null) {
            root = delete(root, key);
            modCount++;
        }
        return old;
    }

    public void clear() {
        root = null;
        modCount++;
    }

    public List<K> inOrderKeys() {
        List<K> list = new ArrayList<>();
        inOrder(root, list);
        return list;
    }

    // Validation helpers for testing/debugging

    public boolean validateBST() {
        return isBST(root, null, null);
    }

    public boolean validateAVL() {
        return isBalanced(root);
    }

    // ---------------------
    // Internal helpers
    // ---------------------

    private Node<K,V> insert(Node<K,V> node, K key, V value) {
        if (node == null) return new Node<>(key, value);
        int cmp = key.compareTo(node.key);
        if (cmp < 0) {
            node.left = insert(node.left, key, value);
        } else if (cmp > 0) {
            node.right = insert(node.right, key, value);
        } else {
            // update existing key
            node.value = value;
            return node;
        }
        update(node);
        return rebalance(node, key);
    }

    private Node<K,V> delete(Node<K,V> node, K key) {
        if (node == null) return null;
        int cmp = key.compareTo(node.key);
        if (cmp < 0) {
            node.left = delete(node.left, key);
        } else if (cmp > 0) {
            node.right = delete(node.right, key);
        } else {
            // found node to delete
            if (node.left == null) return node.right;
            else if (node.right == null) return node.left;
            else {
                Node<K,V> successor = minNode(node.right);
                // copy successor's data
                node.key = successor.key;
                node.value = successor.value;
                // delete successor
                node.right = delete(node.right, successor.key);
            }
        }
        update(node);
        return rebalanceAfterDeletion(node);
    }

    // rotations and rebalance logic

    private Node<K,V> rebalance(Node<K,V> node, K insertedKey) {
        int bf = balanceFactor(node);
        // Left heavy
        if (bf > 1) {
            if (insertedKey.compareTo(node.left.key) < 0) {
                // LL
                return rightRotate(node);
            } else {
                // LR
                node.left = leftRotate(node.left);
                return rightRotate(node);
            }
        }
        // Right heavy
        if (bf < -1) {
            if (insertedKey.compareTo(node.right.key) > 0) {
                // RR
                return leftRotate(node);
            } else {
                // RL
                node.right = rightRotate(node.right);
                return leftRotate(node);
            }
        }
        return node;
    }

    private Node<K,V> rebalanceAfterDeletion(Node<K,V> node) {
        int bf = balanceFactor(node);
        // Left heavy
        if (bf > 1) {
            if (balanceFactor(node.left) >= 0) {
                // LL
                return rightRotate(node);
            } else {
                // LR
                node.left = leftRotate(node.left);
                return rightRotate(node);
            }
        }
        // Right heavy
        if (bf < -1) {
            if (balanceFactor(node.right) <= 0) {
                // RR
                return leftRotate(node);
            } else {
                // RL
                node.right = rightRotate(node.right);
                return leftRotate(node);
            }
        }
        return node;
    }

    private Node<K,V> leftRotate(Node<K,V> x) {
        Node<K,V> y = x.right;
        Node<K,V> T2 = y.left;
        // perform rotation
        y.left = x;
        x.right = T2;
        // update heights and sizes
        update(x);
        update(y);
        return y;
    }

    private Node<K,V> rightRotate(Node<K,V> y) {
        Node<K,V> x = y.left;
        Node<K,V> T2 = x.right;
        // rotation
        x.right = y;
        y.left = T2;
        // update heights and sizes
        update(y);
        update(x);
        return x;
    }

    private void update(Node<K,V> node) {
        node.height = 1 + Math.max(height(node.left), height(node.right));
        node.size = 1 + nodeSize(node.left) + nodeSize(node.right);
    }

    private int height(Node<K,V> n) { return (n == null) ? 0 : n.height; }
    private int nodeSize(Node<K,V> n) { return (n == null) ? 0 : n.size; }
    private int balanceFactor(Node<K,V> n) { return (n == null) ? 0 : height(n.left) - height(n.right); }

    private Node<K,V> minNode(Node<K,V> n) {
        Node<K,V> cur = n;
        while (cur.left != null) cur = cur.left;
        return cur;
    }

    private void inOrder(Node<K,V> node, List<K> out) {
        if (node == null) return;
        inOrder(node.left, out);
        out.add(node.key);
        inOrder(node.right, out);
    }

    // Validation utilities

    private boolean isBST(Node<K,V> node, K min, K max) {
        if (node == null) return true;
        if (min != null && node.key.compareTo(min) <= 0) return false;
        if (max != null && node.key.compareTo(max) >= 0) return false;
        return isBST(node.left, min, node.key) && isBST(node.right, node.key, max);
    }

    private boolean isBalanced(Node<K,V> node) {
        if (node == null) return true;
        int bf = Math.abs(height(node.left) - height(node.right));
        if (bf > 1) return false;
        return isBalanced(node.left) && isBalanced(node.right);
    }

    // For debugging: return height of root
    public int rootHeight() { return height(root); }

    // ----------------------
    // For demonstration/debugging purposes
    // ----------------------
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        toString(root, sb, 0);
        return sb.toString();
    }

    private void toString(Node<K,V> node, StringBuilder sb, int depth) {
        if (node == null) {
            sb.append("null\n");
            return;
        }
        for (int i = 0; i < depth; i++) sb.append("  ");
        sb.append(String.format("(%s: h=%d, sz=%d) value=%s\n",
                node.key, node.height, node.size, node.value));
        toString(node.left, sb, depth + 1);
        toString(node.right, sb, depth + 1);
    }
}
```

-------------------------
## 示例：Main.java（演示用）
```java
package avltree;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        AVLTree<Integer, String> tree = new AVLTree<>();
        int[] keys = {30, 20, 40, 10, 25, 35, 50, 5, 15};

        for (int k : keys) {
            tree.put(k, "v" + k);
        }

        System.out.println("In-order keys: " + tree.inOrderKeys());
        System.out.println("Tree structure:\n" + tree);
        System.out.println("Root height: " + tree.rootHeight());
        System.out.println("Size: " + tree.size());
        System.out.println("Is BST? " + tree.validateBST());
        System.out.println("Is AVL balanced? " + tree.validateAVL());

        System.out.println("\nDelete 20, then 30:");
        tree.remove(20);
        tree.remove(30);
        System.out.println("In-order keys: " + tree.inOrderKeys());
        System.out.println("Tree structure:\n" + tree);
        System.out.println("Is BST? " + tree.validateBST());
        System.out.println("Is AVL balanced? " + tree.validateAVL());
    }
}
```

-------------------------
## 单元测试示例（JUnit5）
```java
package avltree;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Random;
import java.util.List;

public class AVLTreeTest {

    @Test
    public void testInsertAndSearch() {
        AVLTree<Integer, Integer> t = new AVLTree<>();
        for (int i = 0; i < 1000; i++) {
            t.put(i, i * 10);
        }
        assertEquals(1000, t.size());
        for (int i = 0; i < 1000; i++) {
            assertEquals(Integer.valueOf(i * 10), t.get(i));
        }
        assertTrue(t.validateBST());
        assertTrue(t.validateAVL());
    }

    @Test
    public void testRandomInsertDelete() {
        AVLTree<Integer, Integer> t = new AVLTree<>();
        Random rnd = new Random(42);
        int N = 1000;
        for (int i = 0; i < N; i++) t.put(rnd.nextInt(10000), i);
        // perform deletions
        for (int i = 0; i < N/2; i++) {
            int k = rnd.nextInt(10000);
            t.remove(k);
            assertTrue(t.validateBST());
            assertTrue(t.validateAVL());
        }
    }

    @Test
    public void testInOrderSorted() {
        AVLTree<Integer, Integer> t = new AVLTree<>();
        int[] arr = {5,2,8,1,3,7,9};
        for (int x : arr) t.put(x, x);
        List<Integer> keys = t.inOrderKeys();
        for (int i = 1; i < keys.size(); i++) {
            assertTrue(keys.get(i-1) < keys.get(i));
        }
    }
}
```

-------------------------
## 复杂度
- 插入：O(log n)
- 删除：O(log n)
- 搜索：O(log n)
- 空间：O(n)
  证明依据：AVL 保证高度为 O(log n)（最坏情况由斐波那契关系下界得到高度上界）。

-------------------------
## 常见扩展与注意事项
- 允许重复键：在 Node 中加 count 字段或将相等键放在一侧（并记录计数）。
- order-statistics：已在实现中保留 size 字段，可用以实现 select/rank（例如 kth 最小）。
- 非递归实现：需维护父指针或显式栈来回溯更新并旋转。
- 并发：AVL 旋转会改变多节点结构，需使用锁或无锁设计（复杂）。
- 空高度约定必须全局一致（本实现采用 null -> 0，叶子 -> 1）。

-------------------------
## 调试提示
- 每次插入/删除后，检查 validateBST() & validateAVL()。
- 若出现不平衡：打印子树高度与平衡因子，确认旋转更新顺序（先更新被降低节点，再更新新根）。
- 对边界序列（递增/递减）进行测试，观察是否发生旋转。
