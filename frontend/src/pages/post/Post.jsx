import React, { useEffect, useState } from 'react'
import Card from '../../components/Box/Card'
import { useStore } from '../../store/Auth';

const Post = () => {
  const { quites } = useStore();
    return (
      <div className="post-flext-data">
        <Card quitedata={quites} />;
      </div>
    );
}

export default Post