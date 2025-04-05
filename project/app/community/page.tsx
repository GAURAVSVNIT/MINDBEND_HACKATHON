"use client";

import { useState } from "react";
import { MessageSquare, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface Discussion {
  id: string;
  title: string;
  replies: { id: string; content: string; timestamp: Date }[];
}

export default function CommunityPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const [posts, setPosts] = useState<{ id: string; content: string; timestamp: Date; image?: string }[]>([]);
  const [newPost, setNewPost] = useState("");
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
  const [newReply, setNewReply] = useState<{ [key: string]: string }>({});

  const handleAddPost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now().toString(),
        content: newPost,
        timestamp: new Date(),
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  const handleAddDiscussion = () => {
    if (newDiscussionTitle.trim()) {
      const discussion: Discussion = {
        id: Date.now().toString(),
        title: newDiscussionTitle,
        replies: [],
      };
      setDiscussions([discussion, ...discussions]);
      setNewDiscussionTitle("");
    }
  };

  const handleAddReply = (discussionId: string) => {
    if (newReply[discussionId]?.trim()) {
      const reply = {
        id: Date.now().toString(),
        content: newReply[discussionId],
        timestamp: new Date(),
      };
      setDiscussions((prevDiscussions) =>
        prevDiscussions.map((discussion) =>
          discussion.id === discussionId
            ? { ...discussion, replies: [...discussion.replies, reply] }
            : discussion
        )
      );
      setNewReply((prev) => ({ ...prev, [discussionId]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-2">Community Safety Hub</h1>
            <p className="text-blue-600 max-w-2xl mx-auto">
              Stay informed about your neighborhood and connect with your community to create a safer environment.
            </p>
          </header>

          <Tabs defaultValue="feed" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="feed" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Community Feed
              </TabsTrigger>
              <TabsTrigger value="discussions" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Discussions
              </TabsTrigger>
            </TabsList>
                     
            <TabsContent value="feed" className="space-y-4">
            <Card className="p-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="What's happening in your community?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageChange(e)}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800"
                    >
                      <img src="/path-to-placeholder-image.png" alt="Upload" className="w-5 h-5" />
                      Upload Image
                    </label>
                    {previewImage && (
                      <div className="relative w-16 h-16">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={handleAddPost}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!newPost.trim() && !image}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </Card>

              <div className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <Card key={post.id} className="p-4 space-y-4">
                      <p className="text-gray-800">{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post"
                          className="w-full h-auto rounded-md"
                        />
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(post.timestamp).toLocaleString()}
                      </p>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No posts yet. Be the first to share!</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="discussions" className="space-y-4">
              <Card className="p-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Start a new discussion..."
                    value={newDiscussionTitle}
                    onChange={(e) => setNewDiscussionTitle(e.target.value)}
                    className="w-full"
                  />
                  <Button
                    onClick={handleAddDiscussion}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!newDiscussionTitle.trim()}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Start Discussion
                  </Button>
                </div>
              </Card>

              <div className="space-y-4">
                {discussions.length > 0 ? (
                  discussions.map((discussion) => (
                    <Card key={discussion.id} className="p-4 space-y-4">
                      <h3 className="text-lg font-bold text-blue-900">{discussion.title}</h3>
                      <div className="space-y-2">
                        {discussion.replies.map((reply) => (
                          <div key={reply.id} className="p-2 bg-gray-100 rounded-md">
                            <p className="text-gray-800">{reply.content}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(reply.timestamp).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Write a reply..."
                          value={newReply[discussion.id] || ""}
                          onChange={(e) =>
                            setNewReply((prev) => ({
                              ...prev,
                              [discussion.id]: e.target.value,
                            }))
                          }
                          className="w-full"
                        />
                        <Button
                          onClick={() => handleAddReply(discussion.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          disabled={!newReply[discussion.id]?.trim()}
                        >
                          Reply
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No discussions yet. Start one now!</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}