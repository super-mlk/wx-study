// var DBPost = function(){
//     this.storageKeyName = 'postList';//所有的文章本地缓存存储键值
// }

// DBPost.prototype = {
//     //得到全部文章信息
//     getAllPostData:function(){
//         var res = wx.getStorageSync(this.storageKeyName);
//         if(!res){
//             res = require('../data/data.js').postList;
//             this.execSetStorageSync(res);
//         }
//         return res;
//     },

//     //本地缓存  保存/更新
//     execSetStorageSync:function(){
//         wx.setStorageSync(this.storageKeyName, data);
//     },
// };

// module.exports = {
//     DBPost:DBPost
// };

var util = require('../util/util.js')


class DBPost {
    constructor(postId) {
        this.storageKeyName = 'postList';
        this.postId = postId;
    }

    //阅读数+1
    addReadingTimes(){
        this.updatePostData('reading');
    }

    // 发表评论
    newComment(newComment){
        this.updatePostData('comment',newComment);
    }

    //更新本地的点赞、评论信息、收藏、阅读量
    updatePostData(category,newComment){
        var itemData = this.getPostItemById(),
            postData = itemData.data,
            allPostData = this.getAllPostData();
        switch(category){
            case 'collect':
                //处理收藏
                if(!postData.collectionStatus){
                    //如果当前状态是为收藏
                    postData.collectionNum++;
                    postData.collectionStatus = true;
                }else{
                    //如果当前状态是收藏
                    postData.collectionNum--;
                    postData.collectionStatus = false;
                }
                break;
            case "up":
                if(!postData.upStatus){
                    postData.upNum++;
                    postData.upStatus = true;
                }else{
                    postData.upNum--;
                    postData.upStatus = false;
                }
                break;
            case "comment":
                postData.comments.push(newComment);
                postData.commentNum++;
                break;
            case 'reading':
                postData.readingNum++;
                break;
            default:
                break;
        }
        allPostData[itemData.index] = postData;
        this.execSetStorageSync(allPostData);
        return postData;
    }




    // 获取文章的评论数据
    getCommentData() {
        var itemData = this.getPostItemById().data;
        //按时间降序排列评论
        itemData.comments.sort(this.compareWithTime);
        var len = itemData.comments.length,
            comment;

        for (var i = 0; i < len; i++) {
            //将comment中的时间时间戳转换成可阅读格式
            comment = itemData.comments[i];
            comment.create_time = util.getDiffTime(comment.create_time, true);
        }
        return itemData.comments;
    }

    compareWithTime(value1,value2){
        var flag = parseFloat(value1.create_time) - parseFloat(value2.create_time);
        if(flag<0){
            return 1;

        }else if(flag>0){
            return -1;
        }else{
            return 0 ;
        }
    }


    // 获取制定id号的文章数据
    getPostItemById() {
        var postsData = this.getAllPostData();
        var len = postsData.length;
        for (var i = 0; i < len; i++) {
            if (postsData[i].postId == this.postId) {
                return {
                    //当前文章在缓存数据库数组中的序号
                    index: i,
                    data: postsData[i]
                }
            }
        }
    }

    //收藏文章
    collect() {
        return this.updatePostData('collect');
    }

    // 点赞或者取消点赞
    up() {
        var data = this.updatePostData('up');
        return data;
    }

    // 更新本地的点赞、评论信息、收藏、阅读量
    updatePostData(category) {
        var itemData = this.getPostItemById(),
            postData = itemData.data,
            allPostData = this.getAllPostData();

        switch (category) {
            case "collect":
                //处理收藏
                if (!postData.collectionStatus) {
                    //如果当前状态是未收藏
                    postData.collectionNum++;
                    postData.collectionStatus = true;
                } else {
                    //如果当前状态是收藏
                    postData.collectionNum--;
                    postData.collectionStatus = true;
                }
                break;

            case "up":
                if (!postData.upStatus) {
                    postData.upNum++;
                    postData.upStatus = true;
                } else {
                    postData.upNum--;
                    postData.upStatus = false;;
                }
                break;
            default:
                break;
        }
        allPostData[itemData.index] = postData;
        this.execSetStorageSync(allPostData);
        return postData;
    }

    // 更新本地的点赞、评论信息、收藏、阅读量
    // updatePostData(category){
    //     var itemData = this.getPostItemById(),
    //     postData = itemData.data,
    //     allPostData = this.getAllPostData();
    //     switch(category){
    //         case 'collect':
    //             //处理收藏
    //             if(!postData.collectionStatus){
    //                 //如果当前状态是未收藏
    //                 postData.collectionNum++;
    //                 postData.collectionStatus = true;
    //             }else{
    //                 //如果当前状态是收藏
    //                 postData.collectionNum--;
    //                 postData.collectionStatus = false;
    //             }
    //             break;
    //         default:
    //             break;
    //     }

    //     // 更新缓存数据库
    //     allPostData[itemData.index] = postData;
    //     this.execSetStorageSync(allPostData);
    //     return postData;
    // }

    //得到全部文章信息
    getAllPostData() {
        var res = wx.getStorageSync(this.storageKeyName);
        if (!res) {
            res = require('../data/data.js').postList;
            this.initPostList(res);
        }
        return res;
    }

    //保存或者更新缓存数据
    execSetStorageSync(data) {
        wx.setStorageSync(this.storageKeyName, data)
    }
};

export {
    DBPost
}