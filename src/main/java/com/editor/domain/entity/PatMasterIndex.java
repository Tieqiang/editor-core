package com.editor.domain.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Date;

/**
 * Created by Administrator on 2017/4/27.
 * 病人主记录信息
 */
@Entity
@Table(name = "pat_master_index", schema = "editor", catalog = "")
public class PatMasterIndex {
    private String id;
    private String name;
    private String insureNo;
    private String sex;
    private Date birthday;
    private String mrNo;
    private String contactPersonName;
    private String contactPersonTel;
    private String address;
    private String phoneNo;

    @Id
    @Column(name = "id")
    @GenericGenerator(name="generator" ,strategy = "uuid.hex")
    @GeneratedValue(generator = "generator")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "insure_no")
    public String getInsureNo() {
        return insureNo;
    }

    public void setInsureNo(String insureNo) {
        this.insureNo = insureNo;
    }

    @Basic
    @Column(name = "sex")
    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    @Basic
    @Column(name = "birthday")
    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    @Basic
    @Column(name = "mr_no")
    public String getMrNo() {
        return mrNo;
    }

    public void setMrNo(String mrNo) {
        this.mrNo = mrNo;
    }

    @Basic
    @Column(name = "contact_person_name")
    public String getContactPersonName() {
        return contactPersonName;
    }

    public void setContactPersonName(String contactPersonName) {
        this.contactPersonName = contactPersonName;
    }

    @Basic
    @Column(name = "contact_person_tel")
    public String getContactPersonTel() {
        return contactPersonTel;
    }

    public void setContactPersonTel(String contactPersonTel) {
        this.contactPersonTel = contactPersonTel;
    }

    @Basic
    @Column(name = "address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "phone_no")
    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PatMasterIndex that = (PatMasterIndex) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (insureNo != null ? !insureNo.equals(that.insureNo) : that.insureNo != null) return false;
        if (sex != null ? !sex.equals(that.sex) : that.sex != null) return false;
        if (birthday != null ? !birthday.equals(that.birthday) : that.birthday != null) return false;
        if (mrNo != null ? !mrNo.equals(that.mrNo) : that.mrNo != null) return false;
        if (contactPersonName != null ? !contactPersonName.equals(that.contactPersonName) : that.contactPersonName != null)
            return false;
        if (contactPersonTel != null ? !contactPersonTel.equals(that.contactPersonTel) : that.contactPersonTel != null)
            return false;
        if (address != null ? !address.equals(that.address) : that.address != null) return false;
        if (phoneNo != null ? !phoneNo.equals(that.phoneNo) : that.phoneNo != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (insureNo != null ? insureNo.hashCode() : 0);
        result = 31 * result + (sex != null ? sex.hashCode() : 0);
        result = 31 * result + (birthday != null ? birthday.hashCode() : 0);
        result = 31 * result + (mrNo != null ? mrNo.hashCode() : 0);
        result = 31 * result + (contactPersonName != null ? contactPersonName.hashCode() : 0);
        result = 31 * result + (contactPersonTel != null ? contactPersonTel.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (phoneNo != null ? phoneNo.hashCode() : 0);
        return result;
    }
}
