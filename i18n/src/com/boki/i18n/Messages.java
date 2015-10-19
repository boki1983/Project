package com.boki.i18n;

import java.text.MessageFormat;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

public class Messages {
	// �귽�W��
	private static final String BUNDLE_NAME = Messages.getString("Messages.0");  //$NON-NLS-1$

	private static final ResourceBundle RESOURCE_BUNDLE = ResourceBundle.getBundle(BUNDLE_NAME);

	private Messages() {
	}

	/**
	 * ���a�Ѽƪ��귽
	 * 
	 * @param key
	 * @return
	 */
	public static String getString(String key) {
		try {
			return RESOURCE_BUNDLE.getString(key);
		} catch (MissingResourceException e) {
			return '!' + key + '!';
		}
	}

	/**
	 * �a���N�ӰѼƪ��귽
	 * 
	 * @param key
	 * @param params
	 * @return
	 */
	public static String getString(String key, Object... params) {
		try {
			String value = RESOURCE_BUNDLE.getString(key);
            /* Creates a MessageFormat with the given pattern and uses it to format the given arguments.
             */
			return MessageFormat.format(value, params);

		} catch (MissingResourceException e) {
			return '!' + key + '!';
		}
	}

	public static void main(String args[]) {
		System.out.println(getString(Messages.getString("Messages.1"), Messages.getString("Messages.2"), Messages.getString("Messages.3"), Messages.getString("Messages.4"))); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$ //$NON-NLS-4$
	}
}
