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



## GET /api/ufwd/service/artical?keyword=string&examine=boolean
查看所有的文章

## GET /api/ufwd/service/artical/:articalId
查看某一篇文章

## PUT /api/ufwd/service/artical/:articalId
审核某一篇文章
```
{
    examine: boolean,
    comment: string
}
```

## DELETE /api/ufwd/service/artical/:articalId
删除某一篇文章

## GET /api/ufwd/service/category/:categoryId/artical
获取某个分类的所有文章

writer: 
==========================

## POST /api/ufwd/writer/artical
创建一篇文章
```
{
    content: string,
    abstract: string,
    thumb: string,
    published: tinyint(0, 1)
}
```

## GET /api/ufwd/writer/artical?keyword=string&published=tinyint&examine=boolean
查看自己创建的所有文章

## GET /api/ufwd/writer/artical/:articalId
查看自己创建的某篇文章

## PUT /api/ufwd/writer/artical/:articalId
修改自己创建的某篇文章
```
{
    content: string,
    abstract: string,
    thumb: string,
    published: tinyint(0, 1)
}
```

## DELETE /api/ufwd/writer/artical/:articalId
删除自己创建的某篇文章(未发布的可以删)

## POST /api/ufwd/writer/artical/:articalId/category/:categoryId
给某篇文章分类
```
{}
```

## DELETE /api/ufwd/writer/artical/:articalId/category/:categoryId
删除某个文章的分类信息

app:
======================================

## GET /api/ufwd/app/artical?keyword=string&favorite=boolean&like=boolean
查看所有的文章

## GET /api/ufwd/app/artical/:articalId
查看某一篇文章(题目，id)

## GET /api/ufwd/app/artical/:articalId/content
查看某一篇文章(内容)

## GET /api/ufwd/app/category/:categoryId/artical
获取某个分类的所有文章

## POST /api/ufwd/app/artical/:articalId/favorite
对某个文章进行操作(收藏)

## POST /api/ufwd/app/artical/:articalId/like
对某个文章进行操作(收藏)

## DELETE /api/ufwd/app/account/artical/:articalId/favorite
删除自己对某篇文章的(点赞)

## DELETE /api/ufwd/app/account/artical/:articalId/like
删除自己对某篇文章的(点赞)