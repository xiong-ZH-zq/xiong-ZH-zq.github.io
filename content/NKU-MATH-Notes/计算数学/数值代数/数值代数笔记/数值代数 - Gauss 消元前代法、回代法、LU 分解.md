---
title: 数值代数 - Gauss 消元前代法、回代法、LU 分解
date: 2025/02/18
description: 
related: 
type: note
---

## Gauss 消元法

### 算法过程

高代已经讲过，我们在此略过 Gauss 消元法的实际操作流程. 直接说明过程当中的概念.

首先我们要研究的线性方程组是
$$
\boldsymbol{Ax} = \boldsymbol{b}
$$
记 $\boldsymbol{A}^{(1)} = \boldsymbol{A}$ 以及 $\boldsymbol{b}^{(1)}=\boldsymbol{b}$ ，Gauss 消元法第一步就是将第一列除对角部分都消去为 $0$ ，那么就是等价于给 $\boldsymbol{A}$ 左乘如下的矩阵
$$
\boldsymbol{L}_{1} = 
\begin{pmatrix}1 & 0 & 0 & 0 \\ - l_{21} & 1 & 0 & 0 \\ - l_{31} & 0 & 1 & 0 \\ - l_{41} & 0 & 0 & 1\end{pmatrix}
$$
从而
$$
\boldsymbol{L}_{1}\boldsymbol{A}^{(1)} = \boldsymbol{A}^{(2)}, \boldsymbol{L}_{1}\boldsymbol{b}^{(1)} = \boldsymbol{b}^{(2)}
$$
依次进行下去有 $\boldsymbol{L}_{2},\boldsymbol{L}_{3}$ 等等. 


### 消元运算分析

整个消元过程中，第 $k$ 列消元时，有

- $n-k+2$ 个乘除法
- $n-k+1$ 个减法

那么整个消元过程中，有
$$
\sum\limits_{k=1}^{n-1} (n-k+2)(n-k) 
$$
个乘除法. 我们将其展开有
$$
\sum\limits_{k=1}^{n-1} (n-k+2)(n-k)  = \frac{n(n-1)(2n+5)}{6}
$$
因此计算的复杂度为 $O\left(n^{3}\right)$ . 

## LU 分解

### 三角分解

我们接下来讨论矩阵的 LU 分解及其在线性方程组的应用，LU 分解即
$$
\boldsymbol{A} = \boldsymbol{LU}
$$
的矩阵分解方式，其中 $\boldsymbol{L}$ 是单位下三角矩阵，$\boldsymbol{U}$ 是上三角矩阵，容易知道
$$
\boldsymbol{Ax} = \boldsymbol{b}\iff 
\begin{cases}
\boldsymbol{Ly} = \boldsymbol{b}  \\
\boldsymbol{Ux} = \boldsymbol{y}
\end{cases}
$$
LU 分解有相当多的变种：

- Doolittle 分解：$\boldsymbol{A} = \boldsymbol{LU}$ ，$\boldsymbol{L}$ 是单位下三角阵，$\boldsymbol{U}$ 是上三角阵.
- Crout 分解：$\boldsymbol{A} = \boldsymbol{LU}$ ，$\boldsymbol{L}$ 是下三角阵，$\boldsymbol{U}$ 是单位上三角阵.
- LDU 分解：$\boldsymbol{A} = \boldsymbol{LDU}$ ，$\boldsymbol{L}$ 是单位下三角阵，$\boldsymbol{U}$ 是单位上三角阵，$\boldsymbol{D}$ 是对角阵. 这个实际上就是 Doolittle 分解或 Crout 分解的简单推论.
- 若 $\boldsymbol{A}$ 是对称正定的，那么有 Cholesky 分解 $\boldsymbol{A} = \boldsymbol{LL}^{\mathrm{T}}$ ，$\boldsymbol{L}$ 为下三角阵. 若要避免开根号，则有 $\boldsymbol{A} = \boldsymbol{LDL}^{\mathrm{T}}$ ，其中 $\boldsymbol{L}$ 是单位下三角阵，$\boldsymbol{D}$ 是对角阵.
- $\boldsymbol{A}$ 是三对角阵时，对应的解法称为追赶法.

### 前代法

我们考虑通过
$$
\boldsymbol{Ax} = \boldsymbol{b}\iff 
\begin{cases}
\boldsymbol{Ly} = \boldsymbol{b}  \\
\boldsymbol{Ux} = \boldsymbol{y}
\end{cases}
$$
来进行求解，其中求解 $\boldsymbol{Ly}=\boldsymbol{b}$ 的部分称为**前代法**，也就是解下三角线性方程组的问题.

设
$$
\boldsymbol{L} = \begin{pmatrix}l_{11} & 0 & 0 & \cdots & 0 \\ l_{21} & l_{22} & 0 & \cdots & 0 \\ l_{31} & l_{32} & l_{33} & \cdots & 0 \\ \vdots & \vdots & \vdots  & ~ & \vdots \\ l_{n1} & l_{n2} & l_{n3} & \cdots & l_{nn} \end{pmatrix}
$$
是一个下三角矩阵，那么我们根据矩阵乘法逐个往下：
$$
l_{11}y_{1} = b_{1}, l_{21}y_{1}+ l_{22}y_{2}=b_{2},\cdots
$$
于是我们得到如下的表达式：
$$
y_{i} = \dfrac{b_{i} -  \sum\limits_{j=1}^{i-1} l_{ij} y_{j}}{l_{ii}}
$$
因此，根据如上的计算过程，有如下的代码：

```octave
for j=1:n-1
	b(j) = b(j)/L(j,j)
	b(j+1:n) = b(j+1:n) - b(j) * L(j+1:n,j)
end
b(n) = b(n)/L(n,n)
```

>[!warning] 注意
>上述的代码是教材附的，但是伪代码的思路实际上和讲的思路有差异，代码是直接对 $\boldsymbol{b}$ 进行操作使得它变为 $\boldsymbol{y}$ . 后面的回代法也是一样的.

### 回代法

同理，对于
$$
\boldsymbol{Ux} = \boldsymbol{y}
$$
求解 $\boldsymbol{x}$ 可以使用回代法，也就是上三角的情形.

我们直接给出如下的计算公式：
$$
x_{i} = \dfrac{y_{i} - \sum\limits_{j=i+1} ^{n} u_{ij} x_{j}}{u_{ii}}, i = n,n-1,\cdots,1
$$
有如下代码：

```octave
for j=n:-1:2
	y(j) = y(j)/U(j,j)
	y(1:j-1) = y(1:j-1) - y(j) * U(1:j-1,j)
end
y(1) = y(1)/U(1,1)
```


### LU 分解的导出

LU 分解实际上是从 Gauss 消元法导出的，我们考虑每步消元的 $\boldsymbol{L}_{k}$ ，那么第 $k-1$ 步消元后得到的矩阵实际上就是
$$
\boldsymbol{A}_{k} = \boldsymbol{L}_{k-1}\boldsymbol{L}_{k-2}\cdots \boldsymbol{L}_{1} \boldsymbol{A}, k=2,\cdots,n
$$
那么依次到 $n-1$ 步后有
$$
\boldsymbol{A}_{n} \boldsymbol{x} = \boldsymbol{b}_{n}, \boldsymbol{L}_{n-1} \boldsymbol{L}_{n-2}\cdots \boldsymbol{L}_{1}\boldsymbol{A}\boldsymbol{x} = \boldsymbol{b}_{n}
$$
记 $\boldsymbol{L} = \boldsymbol{L}_{1}^{-1}\boldsymbol{L}_{2}^{-1}\cdots \boldsymbol{L}_{n-1}^{-1}$ ，$\boldsymbol{U} = \boldsymbol{A}_{n}$ ，从而
$$
\boldsymbol{A} = \boldsymbol{LU}
$$
其中 $\boldsymbol{L}$ 是单位下三角矩阵，这是由于每个 $\boldsymbol{L}_{k}$ 都是单位下三角矩阵，此外 $\boldsymbol{U}$ 是上三角矩阵，显然这是因为 Gauss 消元法每步消元之后都还是上三角的.

有如下的算法伪代码：

```octave
for k=1:n-1
	A(k+1:n,k) = A(k+1:n,k)/A(k,k)
	A(k+1:n,k+1:n) = A(k+1:n,k+1:n) - A(k+1:n,k) * A(k,k+1:n)
end
```

