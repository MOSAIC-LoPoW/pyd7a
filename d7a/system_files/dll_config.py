import struct

from pyd7a.d7a.support.schema import Validatable, Types


class DllConfigFile(Validatable):
  SCHEMA = [{
    "active_access_class": Types.INTEGER(min=0, max=20),
    "vid": Types.INTEGER(min=0, max=0xFFFF)
    # TODO others
  }]

  def __init__(self, active_access_class=0, vid=0xFFFF):
    self.active_access_class = active_access_class
    self.vid = vid
    super(DllConfigFile, self).__init__()

  @staticmethod
  def parse(s):
    ac = s.read("uint:8")
    vid = s.read("uint:16")
    return DllConfigFile(active_access_class=ac, vid=vid)

  def __iter__(self):
    yield self.active_access_class
    for byte in bytearray(struct.pack(">H", self.vid)):
      yield byte

