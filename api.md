service:
===========================

## POST /api/ufwd/service/writer
创建一个作家     
```
{
    account:用户name(string) 
    channel:频道name(string)
} 
```

## GET /api/ufwd/service/writer?accountId=int&channelId=int
获取所有的作家的信息     

## GET /api/ufwd/service/writer/:wid 
获取某个作家的信息     

## PUT /api/ufwd/service/writer/:wid 
修改某个作家的信息     
```
{
    channelId:频道id(int),
    accountId:用户id(int) 
}
```

## DELETE /api/ufwd/service/writer/:wid 
删除某个作家     

## POST /api/ufwd/service/channel
创建一个频道     
```
{
    name:频道名(string),
    description:频道描述(string)
}
```

## GET /api/ufwd/service/channel&name=string
获取所有的频道的信息     

## GET /api/ufwd/service/channel/:cid 
获取某个频道的信息     

## PUT /api/ufwd/service/channel/:cid 
修改某个频道的信息     
```
{
    name:频道名称(string)
    description:频道描述(string)
}
```

## DELETE /api/ufwd/service/channel/:cid
删除某个频道   

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

## GET /api/ufwd/app/thumbnail
前端获得缩略图列表
```
{}
```
## GET /api/ufwd/app/channel
用户获取频道列表

## POST /api/ufwd/app/account/channel/:channelId
用户关注某个频道     
```
{}
```

## GET /api/ufwd/app/account/channel
获得用户关注的所有频道的信息     

## GET /api/ufwd/app/channel/:channelId
获得某个频道的信息     

## DELETE /api/ufwd/app/account/channel/:channelId
用户取消对某个频道的关注 

## GET /api/ufwd/app/category?symbol=string
按代号获取文章类别列表

## GET /api/ufwd/app/symbol/article?value=string
按代号获取文章类别的文章列表

## GET /api/ufwd/app/article?keyword=string&favorite=boolean&like=boolean&channel=int
查看所有的文章

## GET /api/ufwd/app/article/:articleId
查看某一篇文章(题目，id)

## GET /api/ufwd/app/article/:articleId/content
查看某一篇文章(内容)

## GET /api/ufwd/app/category/:categoryId/article
获取某个分类的所有文章

## POST /api/ufwd/app/article/:articleId/favorite
对某个文章进行操作(点赞)

## GET /api/ufwd/app/article/:articleId/favorite
查看自己对文章进行的操作(点赞)

## POST /api/ufwd/app/article/:articleId/like
对某个文章进行操作(收藏)

## GET /api/ufwd/app/article/:articleId/like
查看自己对文章进行的操作(收藏)

## DELETE /api/ufwd/app/account/article/:articleId/favorite
删除自己对某篇文章的(点赞)

## DELETE /api/ufwd/app/account/article/:articleId/like
删除自己对某篇文章的(点赞)

#ADDED

## DELETE /api/ufwd/writer/article/:articleId/category/:categoryId
删除某个文章的分类信息