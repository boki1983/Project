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
		tag.setName("���q");

		Tag tag2 = new Tag();
		tag2.setName("����");

		Post post = new Post();
		post.setTitle("���ˤ@�Ӧn�����s�i�A�ܦ������𮧮@");
		post.setContent("�����T�C�ۤv�ݧa");
		post.getTags().add(tag);
		post.getTags().add(tag2);

		Session session = HibernateSessionFactory.getSession();
		session.beginTransaction();

		// �x�s�i��Ʈw
		session.persist(post);

		List<Post> list = session.createQuery(
				" select p from Post p left join fetch p.tags t "
						+ " where t.name = :name ").setParameter("name", "���q")
				.list();

		System.out.println("�P���ҡu���q�v���������l�G");
		for (Post p : list) {
			// session.refresh(p);
			System.out.println("���D�G" + p.getTitle());
			System.out.print("���ݼ��ҡG");
			for (Tag t : p.getTags()) {
				System.out.print(t.getName() + ", ");
			}
			System.out.println();
		}

		session.refresh(tag);

		System.out.println("���ҡu" + tag.getName() + "�v�U���������l�G");
		// �o��|�b�U�@��SQL�d��
		for (Post p : tag.getPosts()) {
			System.out.println("���D�G" + p.getTitle());
			System.out.print("���ݼ��ҡG");
			for (Tag t : p.getTags()) {
				System.out.print(t.getName() + ", ");
			}
			System.out.println();
		}

		session.getTransaction().commit();
		session.close();

	}

}
