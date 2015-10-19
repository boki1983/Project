package com.boki.hibernate.test;

import java.util.List;

import org.hibernate.Session;

import com.boki.hibernate.bean.Post;
import com.boki.hibernate.bean.Tag;
import com.boki.hibernate.util.HibernateSessionFactory;

public class TestAnnotationedTagPost {

	@SuppressWarnings("all")
	public static void main(String[] args) throws Exception {

		Tag tag = new Tag();
		tag.setName("幽默");

		Tag tag2 = new Tag();
		tag2.setName("浪漫");

		Post post = new Post();
		post.setTitle("推薦一個好玩的廣告，很有浪漫氣息哦");
		post.setContent("見視訊。自己看吧");
		post.getTags().add(tag);
		post.getTags().add(tag2);

		Session session = HibernateSessionFactory.getSession();
		session.beginTransaction();

		// 儲存進資料庫
		session.persist(post);

		List<Post> list = session.createQuery(
				" select p from Post p left join fetch p.tags t "
						+ " where t.name = :name ").setParameter("name", "幽默")
				.list();

		System.out.println("與標籤「幽默」相關的帖子：");
		for (Post p : list) {
			// session.refresh(p);
			System.out.println("標題：" + p.getTitle());
			System.out.print("所屬標籤：");
			for (Tag t : p.getTags()) {
				System.out.print(t.getName() + ", ");
			}
			System.out.println();
		}

		session.refresh(tag);

		System.out.println("標籤「" + tag.getName() + "」下的相關帖子：");
		// 這邊會在下一次SQL查詢
		for (Post p : tag.getPosts()) {
			System.out.println("標題：" + p.getTitle());
			System.out.print("所屬標籤：");
			for (Tag t : p.getTags()) {
				System.out.print(t.getName() + ", ");
			}
			System.out.println();
		}

		session.getTransaction().commit();
		session.close();

	}

}
