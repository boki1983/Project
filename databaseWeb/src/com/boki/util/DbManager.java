package com.boki.util;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.sql.Types;

import com.mysql.jdbc.Driver;

public class DbManager {

	/**
	 * 獲得預設資料庫連接
	 * @return
	 * @throws SQLException
	 */
	public static Connection getConnection() throws SQLException {
		return getConnection("databaseWeb", "root", "Ie@119653");
	}

	/**
	 * 獲得資料庫連接
	 * 
	 * @param dbName
	 * @param userName
	 * @param password
	 * @return
	 * @throws SQLException
	 */
	public static Connection getConnection(String dbName, String userName,
			String password) throws SQLException {

		String url = "jdbc:mysql://localhost:3306/" + dbName
				+ "?characterEncoding=utf-8";

		DriverManager.registerDriver(new Driver());

		return DriverManager.getConnection(url, userName, password);
	}

	/**
	 * 設定 PreparedStatement 參數
	 * 
	 * @param preStmt
	 * @param params
	 * @throws SQLException
	 */
	public static void setParams(PreparedStatement preStmt, Object... params)
			throws SQLException {

		if (params == null || params.length == 0)
			return;
        //  設訂prepareStatement參數，根據傳入參數型態設訂
		for (int i = 1; i <= params.length; i++) {
			Object param = params[i - 1];
			if (param == null) {
				preStmt.setNull(i, Types.NULL);
			} else if (param instanceof Integer) {
				preStmt.setInt(i, (Integer) param);
			} else if (param instanceof String) {
				preStmt.setString(i, (String) param);
			} else if (param instanceof Double) {
				preStmt.setDouble(i, (Double) param);
			} else if (param instanceof Long) {
				preStmt.setDouble(i, (Long) param);
			} else if (param instanceof Timestamp) {
				preStmt.setTimestamp(i, (Timestamp) param);
			} else if (param instanceof Boolean) {
				preStmt.setBoolean(i, (Boolean) param);
			} else if (param instanceof Date) {
				preStmt.setDate(i, (Date) param);
			}
		}
	}

	/**
	 * 執行 SQL，傳回影響的行數
	 * 
	 * @param sql
	 * @return
	 * @throws SQLException
	 */
	public static int executeUpdate(String sql) throws SQLException {
		return executeUpdate(sql, new Object[] {});
	}

	/**
	 * 帶參數執行SQL，傳回影響的行數
	 * 
	 * @param sql
	 * @param params
	 * @return
	 * @throws SQLException
	 */
	public static int executeUpdate(String sql, Object... params)
			throws SQLException {

		Connection conn = null;
		PreparedStatement preStmt = null;

		try {
			conn = getConnection();

			preStmt = conn.prepareStatement(sql);

			setParams(preStmt, params);

			return preStmt.executeUpdate();

		} finally {
			if (preStmt != null)
				preStmt.close();
			if (conn != null)
				conn.close();
		}
	}

	/**
	 * 獲得總數。
	 * 
	 * @param sql    格式必須為 SELECT count(*) FROM ...
	 * @return
	 * @throws SQLException
	 */
	public static int getCount(String sql) throws SQLException {
        //  設訂connection物件為空
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;

		try {
			conn = getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			rs.next();
			//  傳回第一頁資料(查詢到共幾筆)
			return rs.getInt(1);
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			if (conn != null)
				conn.close();
		}
	}

}
