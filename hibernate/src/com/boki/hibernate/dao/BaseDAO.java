package com.boki.hibernate.dao;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Session;

import com.boki.hibernate.util.HibernateSessionFactory;

public class BaseDAO<T> {

	/**
	 * ���J���
	 * 
	 * @param object
	 */
	public void create(T object) {
        //  �}�Ҥ@��session(connection)
		Session session = HibernateSessionFactory.getSessionFactory().openSession();

		try {
			// �}�ҥ��
			session.beginTransaction();
            // �N����s��DB
			session.persist(object);
            // �������
			session.getTransaction().commit();

		} catch (Exception e) {
			// �Y��exception�A�^�_���
			session.getTransaction().rollback();
		} finally {
			// ����session
			session.close();
		}
	}

	/**
	 * ��s��Ʈw
	 * 
	 * @param object
	 */
	public void update(T object) {
		//  �}�Ҥ@��session(connection)
		Session session = HibernateSessionFactory.getSessionFactory().openSession();

		try {
			// �}�ҥ��
			session.beginTransaction();
            // ��s�����������
			session.update(object);
            // �������
			session.getTransaction().commit();
		} catch (Exception e) {
			// �Y��exception�A�^�_���
			session.getTransaction().rollback();
		} finally {
			// ����session
			session.close();
		}
	}

	/**
	 * �q��Ʈw���R��
	 * 
	 * @param object
	 */
	public void delete(T object) {
		//  �}�Ҥ@��session(connection)
		Session session = HibernateSessionFactory.getSessionFactory().openSession();

		try {
			// �}�ҥ��
			session.beginTransaction();
            // ��s�����������
			session.delete(object);
            // �������
			session.getTransaction().commit();
		} catch (Exception e) {
			// �Y��exception�A�^�_���
			session.getTransaction().rollback();
		} finally {
			// ����session
			session.close();
		}
	}

	/**
	 * �M���@Entity Bean
	 * 
	 * @param clazz
	 * @param id
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public T find(Class<? extends T> clazz, Serializable id) {

		Session session = HibernateSessionFactory.getSessionFactory().openSession();
		try {
			session.beginTransaction();
			//  �ھ�id�d�߹������O����
			return (T) session.get(clazz, id);
		} finally {
			session.getTransaction().commit();
			session.close();
		}
	}

	/**
	 * �M��h��Entity Bean
	 * 
	 * @param hql
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<T> list(String hql) {

		Session session = HibernateSessionFactory.getSessionFactory().openSession();
		try {
			session.beginTransaction();
			// �d��hibernate query language���G�A�Ǧ^list����
			return session.createQuery(hql).list();
		} finally {
			session.getTransaction().commit();
			session.close();
		}
	}
}
