service:
===========================

## POST /api/ufwd/service/category
创建文章类别
```
{
    name: string,
    description: string
}
```

## GET /api/ufwd/service/category?keyword=string
获取所有的文章类别

## GET /api/ufwd/service/category/:categoryId
获取某个文章类别

## PUT /api/ufwd/service/category/:categoryId
修改某个文章类别
```
{
    name: string,
    description: string
}
```

## DELETE /api/ufwd/service/category/:categoryId
删除某个文章类别



## GET /api/ufwd/service/article?keyword=string&examine=boolean
查看所有的文章

## GET /api/ufwd/service/article/:articleId
查看某一篇文章

## PUT /api/ufwd/service/article/:articleId
审核某一篇文章
```
{
    examine: boolean,
    comment: string
}
```

## DELETE /api/ufwd/service/article/:articleId
删除某一篇文章

## GET /api/ufwd/service/category/:categoryId/article
获取某个分类的所有文章

app:
======================================

## GET /api/ufwd/app/article?keyword=string&favorite=boolean&like=boolean&channel=int
查看所有的文章

## GET /api/ufwd/app/article/:articleId
查看某一篇文章(题目，id)

## GET /api/ufwd/app/article/:articleId/content
查看某一篇文章(内容)

## GET /api/ufwd/app/category/:categoryId/article
获取某个分类的所有文章

## POST /api/ufwd/app/article/:articleId/favorite
对某个文章进行操作(收藏)

## POST /api/ufwd/app/article/:articleId/like
对某个文章进行操作(收藏)

## DELETE /api/ufwd/app/account/article/:articleId/favorite
删除自己对某篇文章的(点赞)

## DELETE /api/ufwd/app/account/article/:articleId/like
删除自己对某篇文章的(点赞)

#ADDED

## DELETE /api/ufwd/writer/article/:articleId/category/:categoryId
删除某个文章的分类信息