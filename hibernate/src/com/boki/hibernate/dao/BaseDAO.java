package com.boki.hibernate.dao;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Session;

import com.boki.hibernate.util.HibernateSessionFactory;

public class BaseDAO<T> {

	/**
	 * 插入資料
	 * 
	 * @param object
	 */
	public void create(T object) {
        //  開啟一個session(connection)
		Session session = HibernateSessionFactory.getSessionFactory().openSession();

		try {
			// 開啟交易
			session.beginTransaction();
            // 將物件存到DB
			session.persist(object);
            // 結束交易
			session.getTransaction().commit();

		} catch (Exception e) {
			// 若有exception，回復交易
			session.getTransaction().rollback();
		} finally {
			// 關閉session
			session.close();
		}
	}

	/**
	 * 更新資料庫
	 * 
	 * @param object
	 */
	public void update(T object) {
		//  開啟一個session(connection)
		Session session = HibernateSessionFactory.getSessionFactory().openSession();

		try {
			// 開啟交易
			session.beginTransaction();
            // 更新物件到對應資料
			session.update(object);
            // 結束交易
			session.getTransaction().commit();
		} catch (Exception e) {
			// 若有exception，回復交易
			session.getTransaction().rollback();
		} finally {
			// 關閉session
			session.close();
		}
	}

	/**
	 * 從資料庫中刪除
	 * 
	 * @param object
	 */
	public void delete(T object) {
		//  開啟一個session(connection)
		Session session = HibernateSessionFactory.getSessionFactory().openSession();

		try {
			// 開啟交易
			session.beginTransaction();
            // 更新物件到對應資料
			session.delete(object);
            // 結束交易
			session.getTransaction().commit();
		} catch (Exception e) {
			// 若有exception，回復交易
			session.getTransaction().rollback();
		} finally {
			// 關閉session
			session.close();
		}
	}

	/**
	 * 尋找單一Entity Bean
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
			//  根據id查詢實體類別物件
			return (T) session.get(clazz, id);
		} finally {
			session.getTransaction().commit();
			session.close();
		}
	}

	/**
	 * 尋找多個Entity Bean
	 * 
	 * @param hql
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<T> list(String hql) {

		Session session = HibernateSessionFactory.getSessionFactory().openSession();
		try {
			session.beginTransaction();
			// 查詢hibernate query language結果，傳回list物件
			return session.createQuery(hql).list();
		} finally {
			session.getTransaction().commit();
			session.close();
		}
	}
}
