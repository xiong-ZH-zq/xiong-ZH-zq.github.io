---
title: 几何学 - 多边形 (Polygon)
date: 2025/02/22
description: 
related: 
type: note
---

## Intro

多边形的概念在以前的几何课当中就学过，其中英文概念的对应为：

- 顶点：vertex
- 边：edge

此外，边数较少的多边形有如下英文单词对应：


| $n$  | 3        | 4              | 5        | 6       | 7        | 8       |
| ---- | -------- | -------------- | -------- | ------- | -------- | ------- |
| name | triangle | quadirilateral | pentagon | hexagon | heptagon | octagon |


## 多边形分类

### 简单多边形 (simple polygon)

>[!note] 定义：简单多边形
>不自交的多边形称为简单多边形.

简单多边形将平面划分为两个区域，其中面积有限的区域称为多边形区域.

### 凸多边形 (convex polygon)

>[!note] 定义：凸多边形
>如果一条直线与某个多边形要么不交，要么只交于两点，则称该多边形为凸多边形.

凸多边形也可以用凸集的概念定义，它的每个内角都小于 $\pi$ .

对于所有的 $n$ 边形：

- 内角和为 $2\pi(n-2)$ .
- 外角和为 $2\pi$ .

### 正多边形 (regular polygon)

>[!note] 定义：正多边形
>如果多边形各边相等，各内角相等，则称为正多边形.


## 全等多边形 (congruent polygon)

如果要证明 $m$ 边形 $P$ 和 $n$ 边形 $Q$ 全等，则需要：

- 边数一致：$m=n$ .
- 各内角对应相等：$\alpha_{i}=\beta_{i}$ .
- 各边长对应相等：$e_{i}=f_{i}$ .

## 正多边形的对称、二面体群

### 对称变换

这里我们讨论正多边形的对称，而其他类型的多边形实际上也能由此类推，现在考虑变换 $\varphi$ ，我们知道多边形如果旋转对称，则通过旋转不到 $2\pi$ 就能使得图形重叠；我们设正多边形 $P$ 经过变换 $\varphi$ 后得到 $P'$，其顶点分别记为 $v_{i},v_{i}'$ ，那么如果有旋转的对称，则当 $\varphi(v_{1})=v_{k}'$ 时，有

- $v_{i}$ 和 $v_{k+i-1}'$ 所对的内角相等；
- $e_{i} = e_{k+i-1}'$ 边长相等.

同理，如果有轴对称，在上述情形下只需将条件改为：

- $v_{i}$ 和 $v_{k-i+1}'$ 所对的内角相等；
- $e_{i} = e_{k-i+1}'$ 边长相等.

### 抽象群

下面我们来将刚才所讲的正多边形对称变换标准化，如下图，对正六边形，设 $g_{1}$ 为逆时针旋转 $120^{\circ}$ ，$g_{2}$ 为根据对称轴作对称（见图），那么作复合有 $g_{1}\circ g_{2}$ . 

![](https://raw.githubusercontent.com/xiong-ZH-zq/My-PicGO-Img/main/blog/dihedral%20group.png)

记所有的变换全体为 $D_{n}$，继续讨论复合运算，它相当于对称变换的二元运算：
$$
\circ : D_{n}\times D_{n}\to D_{n}, (g,g')\mapsto g\circ g'
$$
它有什么运算性质呢？

- 它满足结合律，也就是说 $g_{1},g_{2},g_{3}\in D_{n}$ 时，有 $g_{3}\circ (g_{1}\circ g_{2})= (g_{3}\circ g_{1})\circ g_{2}$ .
- 对恒等映射 $\mathrm{id}_{P}$ ，它是运算的“幺元”，换言之，所有与它复合的元素都保持原样：$\mathrm{id}_{P}\circ g = g\circ \mathrm{id}_{P} = g$ .
- 所有的变换都有逆变换，换言之对 $g\in D_{n}$ ，存在 $g^{-1}\in D_{n}$ ，使得 $g\circ g^{-1} =\mathrm{id}_{P}$ .

那么我们这里可以引入抽象群的概念了.

>[!note] 定义：群
> 抽象群是一个非空集合 + 二元运算的有序对 $(X,\circ)$ ，其中
> $$
> \circ : X\times X \to X, (x,y)\mapsto x\circ y 
> $$
> 并且二元运算满足如下群公理：
> 1. 结合律：$x\circ (y\circ z) = (x\circ y)\circ z$ .
> 2. 存在幺元：$e\in X$ 使得 $e\circ x = x\circ e = x$ .
> 3. 存在逆元：$x\in X$ 都存在 $x^{-1}$ 使得 $x\circ x^{-1} = x^{-1}\circ x = e$ .

## 二面体群 (Dihedral groups)

在刚刚我们已经提到，对平面几何图形的变换无非是旋转和反射 (reflect) 变换，那么我们设对于正 $n$ 边形，$r = \dfrac{2\pi}{n}$ 且 $s$ 为根据某个固定对称轴反射，则我们可以逐步推广：

- $r$ 进行 $k$ 次复合得到 $r^{k}$ ，相当于逆时针旋转 $\dfrac{2k \pi}{n}$ ；
- $s^{2}$ 得到的是幺元 $\mathrm{id}$ .

从而我们可以得到 $D_{n}$ 的元素为：
$$
D_{n} = \left\lbrace \mathrm{id},r ,\cdots,r^{n-1},s,r\circ s,r^{2}\circ s ,\cdots,r^{n-1} \circ s \right\rbrace
$$
我们称 $D_{n}$ 为 $n$ 阶**二面体群**，上述的所有元素都可以用 $\left\lbrace r,n \right\rbrace$ 生成，因此 $\left\lbrace r,n \right\rbrace$ 称为**生成元** (generators). 其阶数（即群中元素个数）为 $2n$ .

我们可以用一种名为 Cayley 图的图像来描述生成元生成各个元素的路径. 这里给一个很好的 Cayley 图[可视化网站](https://juliapoo.github.io/Cayley-Graph-Plotting/)以供学习交流使用.


