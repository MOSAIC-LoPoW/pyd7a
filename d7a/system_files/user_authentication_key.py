#
# Copyright (c) 2021 Aloxy NV.
#
# This file is part of pyd7a
# (see https://github.com/MOSAIC-LoPoW/pyd7a).
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#
import struct

from d7a.support.schema import Validatable, Types
from d7a.system_files.file import File
from d7a.system_files.system_file_ids import SystemFileIds


class UserAuthenticationKeyFile(File, Validatable):

  SCHEMA = [{
    "key": Types.BITS(length=128),
    "rfu": Types.BITS(length=192)
  }]

  def __init__(self, key=0):
    self.key = key
    self.rfu = 0
    Validatable.__init__(self)
    File.__init__(self, SystemFileIds.ALP_USER_AUTHENTICATION_KEY.value, 40)

  @staticmethod
  def parse(s):
    key = s.read("bytes:16")
    _rfu = s.read("bytes:24")
    return UserAuthenticationKeyFile(key)

  def __iter__(self):
    for byte in [(self.key & (0xff << pos * 8)) >> pos * 8 for pos in range(16)]:
      yield byte

    for byte in range(24):
      yield 0

  def __str__(self):
    return "key={}".format(self.key)