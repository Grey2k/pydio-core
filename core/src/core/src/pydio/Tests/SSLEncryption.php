<?php
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */
namespace Pydio\Tests;

defined('AJXP_EXEC') or die( 'Access not allowed');

/**
 * Detect HTTPS protocol
 * @package Pydio
 * @subpackage Tests
 */
class SSLEncryption extends AbstractTest
{

    /**
     * @inheritdoc
     */
    public function __construct() { parent::__construct("SSL Encryption", "You are not using SSL encryption, or it was not detected by the server. Be aware that it is strongly recommended to secure all communication of data over the network."); }

    /**
     * @inheritdoc
     */
    public function doTest()
    {
        // Get the locale
        $ssl = false;
        if (isSet($_SERVER["HTTPS"]) && strtolower($_SERVER["HTTPS"]) == "on") {
            $ssl = true;
        }
        if (!$ssl) {
            $this->failedLevel = "warning";
            $this->failedInfo .= "<p class='suggestion'><b>Suggestion</b> : if your server supports HTTPS, make sure to configure the automatic redirection from http to https.</p>";
            return FALSE;
        } else {
            $this->failedInfo .= "Https protocol detected";
            return TRUE;
        }
    }
}