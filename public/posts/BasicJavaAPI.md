# java 常用操作方法

## 字符串操作常用方法

### `charAt(int index)`
- **描述**：返回指定索引处的字符。
- **示例**：
```
String str = "hello";
char ch = str.charAt(1); // 返回 'e'
```

### `length()`
- **描述**：返回字符串的长度。
- **示例**：
```
String str = "hello";
int len = str.length(); // 返回 5
```

### `substring(int beginIndex, int endIndex)`
- **描述**：返回一个新的字符串，它是此字符串的一个子字符串。
- **示例**：
```
String str = "hello";
String sub = str.substring(1, 3); // 返回 "el"
```

### `equals(Object anObject)`
- **描述**：将此字符串与指定对象进行比较。
- **示例**：
```
String str1 = "hello";
String str2 = "hello";
boolean isEqual = str1.equals(str2); // 返回 true
```

### `indexOf(String str)`
- **描述**：返回指定子字符串第一次出现的索引。
- **示例**：
```
String str = "hello";
int index = str.indexOf("l"); // 返回 2
```

## 字符操作常用方法

### `Character.isDigit(char ch)`
- **描述**：确定指定字符是否为数字。
- **示例**：
```
char ch = '5';
boolean isDigit = Character.isDigit(ch); // 返回 true
```

### `Character.isLetter(char ch)`
- **描述**：确定指定字符是否为字母。
- **示例**：
```
char ch = 'a';
boolean isLetter = Character.isLetter(ch); // 返回 true
```

### `Character.toUpperCase(char ch)`
- **描述**：将字符转换为大写。
- **示例**：
```
char ch = 'a';
char upperCh = Character.toUpperCase(ch); // 返回 'A'
```

## 列表和数组操作常用方法

### `ArrayList.add(E e)`
- **描述**：将指定的元素添加到列表的末尾。
- **示例**：
```
ArrayList<String> list = new ArrayList<>();
list.add("hello");
list.add("world");
```

### `ArrayList.size()`
- **描述**：返回列表中的元素数。
- **示例**：
```
ArrayList<String> list = new ArrayList<>();
list.add("hello");
int size = list.size(); // 返回 1
```

### `Arrays.sort(int[] a)`
- **描述**：对指定的数组进行排序。
- **示例**：
```
int[] arr = {3, 1, 2};
Arrays.sort(arr); // arr 变为 {1, 2, 3}
```

## 输入输出操作常用方法

### `System.out.println(String x)`
- **描述**：打印指定的字符串并换行。
- **示例**：
```
System.out.println("Hello, World!");
```

### `Scanner.nextLine()`
- **描述**：从输入中读取一行。
- **示例**：
```
Scanner scanner = new Scanner(System.in);
System.out.println("Enter your name: ");
String name = scanner.nextLine();
System.out.println("Hello, " + name);
```

### `FileReader(File file)`
- **描述**：创建一个读取文件的对象。
- **示例**：
```
File file = new File("test.txt");
FileReader fr = new FileReader(file);
```

## 数学操作常用方法

### `Math.abs(int a)`
- **描述**：返回一个数的绝对值。
- **示例**：
```
int absValue = Math.abs(-10); // 返回 10
```

### `Math.max(int a, int b)`
- **描述**：返回两个数中的较大值。
- **示例**：
```
int maxValue = Math.max(5, 10); // 返回 10
```

### `Math.min(int a, int b)`
- **描述**：返回两个数中的较小值。
- **示例**：
```
int minValue = Math.min(5, 10); // 返回 5
```